import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FoodCard from '../components/common/FoodCard';
import Loader from '../components/common/Loader';
import api from '../services/api';

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Rolls', 'Drinks', 'Shakes', 'Sides', 'Desserts'];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const category = searchParams.get('category') || 'All';

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'All') params.category = category;
    if (debouncedSearch)    params.search    = debouncedSearch;

    api.get('/food', { params })
      .then(r => setFoods(r.data.foods))
      .finally(() => setLoading(false));
  }, [category, debouncedSearch]);

  const setCategory = (c) => {
    setSearchParams(c === 'All' ? {} : { category: c });
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-10 bg-dark-800 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-2">Our Menu</h1>
          <p className="text-gray-500 mb-8">Fresh, hot, and straight from our kitchen to your door</p>

          {/* Search */}
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="input pl-11 pr-10"
              placeholder="Search burgers, pizzas, shakes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                category === c
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-white/5 hover:border-brand-500/30'
              }`}
            >{c}</button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-gray-600 text-sm mb-6">
            {foods.length} item{foods.length !== 1 ? 's' : ''} {debouncedSearch ? `for "${debouncedSearch}"` : `in ${category}`}
          </p>
        )}

        {/* Grid */}
        {loading ? <Loader /> : foods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-heading font-bold text-white text-xl mb-2">Nothing found</h3>
            <p className="text-gray-500 text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {foods.map(food => <FoodCard key={food._id} food={food} />)}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
