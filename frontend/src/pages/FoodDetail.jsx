import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar, FiClock, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function FoodDetail() {
  const { id }            = useParams();
  const { addItem, items }= useCart();
  const [food, setFood]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]     = useState(1);

  const inCart = items.find(i => i._id === id);

  useEffect(() => {
    api.get(`/food/${id}`)
      .then(r => setFood(r.data.food))
      .catch(() => toast.error('Item not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Navbar /><Loader full /></>;
  if (!food)   return <><Navbar /><div className="min-h-screen bg-dark-900 flex items-center justify-center text-gray-400">Item not found.</div></>;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link to="/menu" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden aspect-square">
            <img src={food.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80'}
              alt={food.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="animate-slide-up">
            <span className="badge bg-brand-500/20 text-brand-400 text-xs mb-4">{food.category}</span>
            <h1 className="font-display text-4xl text-white mb-3">{food.name}</h1>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1">
                <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold text-sm">{food.ratings}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <FiClock className="w-4 h-4 text-brand-400" />
                {food.prepTime}
              </div>
              {inCart && (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <FiCheck className="w-4 h-4" /> In your cart
                </div>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">{food.description}</p>

            <div className="border-t border-white/5 pt-6 mb-8">
              <p className="text-brand-400 text-3xl font-bold font-heading">Rs. {food.price}</p>
              <p className="text-gray-600 text-xs mt-1">Inclusive of all taxes</p>
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-dark-700 rounded-xl px-4 py-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center hover:bg-brand-500/40 transition-colors font-bold">−</button>
                <span className="text-white font-bold w-5 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center hover:bg-brand-500/40 transition-colors font-bold">+</button>
              </div>

              <button
                onClick={() => { for (let i = 0; i < qty; i++) addItem(food); }}
                className="btn-primary flex-1 py-3.5 rounded-xl"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add {qty > 1 ? `${qty}x` : ''} to Cart — Rs. {food.price * qty}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
