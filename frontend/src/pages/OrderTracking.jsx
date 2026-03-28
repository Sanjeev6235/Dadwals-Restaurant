import { useState, useEffect } from 'react';
import { FiPackage, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { OrderStatusBadge, OrderStepper } from '../components/common/OrderStatus';
import api from '../services/api';

export default function OrderTracking() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.get('/orders/my')
      .then(r => { setOrders(r.data.orders); if (r.data.orders.length > 0) setExpanded(r.data.orders[0]._id); })
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><Navbar /><Loader full /></>;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="section-title mb-2">My Orders</h1>
        <p className="text-gray-500 mb-10">Track your orders in real-time</p>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-5">📦</div>
            <h2 className="font-heading font-bold text-white text-2xl mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Your order history will appear here once you've placed an order.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="card overflow-hidden">
                {/* Order header */}
                <button
                  className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/2 transition-colors text-left"
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white">Order #{order.orderNumber}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleString('en-PK', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-brand-400 font-bold font-heading">Rs. {order.totalPrice}</span>
                    <span className="text-gray-600 text-xs">{expanded === order._id ? '▲' : '▼'}</span>
                  </div>
                </button>

                {/* Expanded content */}
                {expanded === order._id && (
                  <div className="border-t border-white/5 p-5 space-y-6 animate-fade-in">
                    {/* Progress stepper */}
                    <div className="overflow-x-auto pb-2">
                      <div className="min-w-[500px]">
                        <OrderStepper status={order.status} />
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</h4>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            )}
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{item.name}</p>
                              <p className="text-gray-500 text-xs">x{item.quantity}</p>
                            </div>
                            <p className="text-brand-400 text-sm font-semibold">Rs. {item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Delivery Address</p>
                        <p className="text-white">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment</p>
                        <p className="text-white">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-white/5 pt-4 flex justify-between">
                      <span className="text-gray-400 text-sm">Total Amount</span>
                      <span className="text-brand-400 font-bold font-heading text-lg">Rs. {order.totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
