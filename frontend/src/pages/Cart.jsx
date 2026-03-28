import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiShoppingCart, FiMapPin, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address || '');
  const [phone,   setPhone]   = useState(user?.phone   || '');
  const [placing, setPlacing] = useState(false);

  const DELIVERY_FEE = totalPrice > 800 ? 0 : 99;
  const grandTotal   = totalPrice + DELIVERY_FEE;

  const handleOrder = async () => {
    if (!user) { toast.error('Please login to place an order'); navigate('/login'); return; }
    if (!address.trim()) { toast.error('Please enter delivery address'); return; }
    if (!phone.trim())   { toast.error('Please enter phone number'); return; }
    if (items.length === 0) { toast.error('Cart is empty'); return; }

    setPlacing(true);
    try {
      const orderItems = items.map(i => ({
        foodId: i._id, name: i.name, price: i.price, image: i.image, quantity: i.quantity,
      }));
      const { data } = await api.post('/orders', {
        items: orderItems, totalPrice: grandTotal,
        deliveryAddress: address, phone, paymentMethod: 'COD',
      });
      clearCart();
      toast.success('🎉 Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="font-display text-4xl text-white mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/menu" className="btn-primary">Browse Menu <FiShoppingCart className="w-4 h-4" /></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link to="/menu" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="section-title mb-10">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item._id} className="card p-4 flex items-center gap-4 hover:border-white/10 transition-all">
                <img src={item.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80'}
                  alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-white text-sm mb-0.5 truncate">{item.name}</h3>
                  <p className="text-brand-400 font-bold">Rs. {item.price}</p>
                </div>

                <div className="flex items-center gap-2 bg-dark-700 rounded-xl px-3 py-2">
                  <button onClick={() => updateQty(item._id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center hover:bg-brand-500/40 font-bold text-sm">−</button>
                  <span className="text-white font-bold w-5 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center hover:bg-brand-500/40 font-bold text-sm">+</button>
                </div>

                <p className="text-white font-bold text-sm w-20 text-right hidden sm:block">
                  Rs. {item.price * item.quantity}
                </p>

                <button onClick={() => removeItem(item._id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-300 transition-colors mt-2">
              Clear all items
            </button>
          </div>

          {/* Checkout panel */}
          <div className="space-y-4">
            {/* Delivery info */}
            <div className="card p-5">
              <h3 className="font-heading font-bold text-white mb-4">Delivery Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="label flex items-center gap-1.5"><FiMapPin className="w-3.5 h-3.5 text-brand-400" /> Delivery Address</label>
                  <textarea className="input resize-none" rows={3} placeholder="Enter your full address…"
                    value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                  <label className="label flex items-center gap-1.5"><FiPhone className="w-3.5 h-3.5 text-brand-400" /> Phone Number</label>
                  <input className="input" placeholder="+92 3XX XXXXXXX"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="card p-5">
              <h3 className="font-heading font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>Rs. {totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className={DELIVERY_FEE === 0 ? 'text-green-400' : ''}>
                    {DELIVERY_FEE === 0 ? 'FREE' : `Rs. ${DELIVERY_FEE}`}
                  </span>
                </div>
                {DELIVERY_FEE > 0 && (
                  <p className="text-xs text-gray-600">Add Rs. {800 - totalPrice} more for free delivery</p>
                )}
                <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-brand-400 text-lg">Rs. {grandTotal}</span>
                </div>
              </div>

              <div className="bg-dark-700 rounded-xl p-3 mb-4 flex items-center gap-2 text-xs text-gray-400">
                <span>💵</span> Cash on Delivery (COD)
              </div>

              {!user && (
                <p className="text-xs text-amber-400 mb-3 text-center">⚠️ Please login to place order</p>
              )}

              <button onClick={handleOrder} disabled={placing}
                className="btn-primary w-full py-4 rounded-xl text-base">
                {placing
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : '🍔 Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
