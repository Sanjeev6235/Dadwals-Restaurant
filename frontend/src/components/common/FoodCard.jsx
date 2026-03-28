import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function FoodCard({ food }) {
  const { addItem } = useCart();

  return (
    <div className="card-hover group">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={food.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 badge bg-brand-500/90 text-white text-[10px] uppercase tracking-wider">
          {food.category}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
          <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-white font-semibold">{food.ratings}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/food/${food._id}`}>
          <h3 className="font-heading font-bold text-white text-base mb-1 hover:text-brand-400 transition-colors line-clamp-1">
            {food.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{food.description}</p>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <FiClock className="w-3.5 h-3.5 text-brand-400" />
          {food.prepTime}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-brand-400 font-bold text-xl font-heading">Rs. {food.price}</span>
          </div>
          <button
            onClick={() => addItem(food)}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all active:scale-95"
          >
            <FiShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
