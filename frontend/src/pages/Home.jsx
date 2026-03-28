import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiClock, FiTruck, FiShield } from 'react-icons/fi';
import { MdLocalOffer } from 'react-icons/md';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FoodCard from '../components/common/FoodCard';
import Loader from '../components/common/Loader';
import api from '../services/api';

const CATEGORIES = [
  { name: 'Pizza',   emoji: '🍕', desc: 'Wood-fired perfection' },
  { name: 'Burger',  emoji: '🍔', desc: 'Juicy & stacked' },
  { name: 'Rolls',   emoji: '🌯', desc: 'Crispy street bites' },
  { name: 'Drinks',  emoji: '🧉', desc: 'Fresh & chilled' },
  { name: 'Shakes',  emoji: '🥤', desc: 'Thick & creamy' },
  { name: 'Sides',   emoji: '🍟', desc: 'Perfect companions' },
];

const REVIEWS = [
  { name: 'Ayesha R.', rating: 5, text: 'Best burgers in Lahore, hands down! The Double Smash is legendary. Fast delivery too!', avatar: 'A' },
  { name: 'Hassan M.', rating: 5, text: 'Dadwals pizza changed my life. Cheese Burst is everything. My whole family orders weekly.', avatar: 'H' },
  { name: 'Sara K.',   rating: 5, text: 'The chocolate shake is unreal. I order it every single time. Can\'t recommend enough!', avatar: 'S' },
];

const FEATURES = [
  { icon: FiTruck,   title: 'Fast Delivery', desc: 'Hot food at your door in 30-45 minutes' },
  { icon: FiStar,    title: 'Premium Quality', desc: 'Fresh ingredients sourced daily' },
  { icon: FiClock,   title: 'Open Late',      desc: 'Serving you until 2AM every day' },
  { icon: FiShield,  title: 'Safe & Hygienic', desc: 'HACCP-certified kitchen standards' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/food?featured=true')
      .then(r => setFeatured(r.data.foods.slice(0, 8)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* BG */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&q=80" alt="Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-transparent" />
        </div>

        {/* Floating food circles (decorative) */}
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full overflow-hidden border-4 border-brand-500/20 animate-float hidden lg:block">
          <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 right-64 w-40 h-40 rounded-full overflow-hidden border-4 border-brand-500/30 animate-float hidden xl:block" style={{ animationDelay: '1s' }}>
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
              <MdLocalOffer className="w-4 h-4" /> Free delivery on orders over Rs. 800
            </div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
              Taste the<br />
              <span className="gradient-text">Difference</span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
              Lahore's most-loved fast food restaurant. From legendary burgers to wood-fired pizzas — every bite tells a story.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary text-base py-4 px-8 rounded-2xl">
                Order Now <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="btn-outline text-base py-4 px-8 rounded-2xl">
                Explore Menu
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[['500+', 'Daily Orders'], ['4.9★', 'Rating'], ['30min', 'Avg Delivery']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-bold font-heading text-white">{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-3">Browse by Category</p>
          <h2 className="section-title">What Are You Craving?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ name, emoji, desc }) => (
            <Link key={name} to={`/menu?category=${name}`}
              className="card-hover p-5 text-center group cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{emoji}</div>
              <p className="font-heading font-bold text-white text-sm mb-0.5">{name}</p>
              <p className="text-gray-600 text-[11px]">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED DISHES ───────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-3">Chef's Picks</p>
            <h2 className="section-title">Popular Dishes</h2>
          </div>
          <Link to="/menu" className="btn-ghost hidden sm:flex">
            View All Menu <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(food => <FoodCard key={food._id} food={food} />)}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/menu" className="btn-outline">View Full Menu</Link>
        </div>
      </section>

      {/* ── WHY DADWALS ───────────────────────────────────────────── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="section-title">The Dadwals Promise</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center group hover:border-brand-500/30 transition-all">
                <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="font-heading font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-96">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="About" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-brand-500 text-white p-5 rounded-2xl shadow-xl">
              <p className="font-display text-3xl">13+</p>
              <p className="text-sm font-semibold mt-0.5">Years of Excellence</p>
            </div>
          </div>
          <div className="animate-fade-in">
            <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">Our Story</p>
            <h2 className="section-title mb-6">Lahore's Favourite<br />Since 2010</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Dadwals Restaurant was born out of a simple dream — to serve the people of Lahore the most delicious, fresh, and satisfying fast food at honest prices.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              From our first outlet in Gulberg to being a household name across the city, we've stayed true to our roots: real ingredients, bold flavours, and genuine hospitality.
            </p>
            <Link to="/menu" className="btn-primary">Explore Our Menu <FiArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="section-title">What Our Fans Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(({ name, rating, text, avatar }) => (
              <div key={name} className="card p-6 hover:border-brand-500/30 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                    {avatar}
                  </div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80')] bg-cover bg-center" />
          <div className="relative">
            <h2 className="font-display text-5xl text-white mb-4">Hungry Right Now?</h2>
            <p className="text-brand-100 text-lg mb-8 max-w-md mx-auto">Order online and get fresh food delivered to your door. Fast. Hot. Delicious.</p>
            <Link to="/menu" className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-2xl hover:bg-brand-50 transition-colors text-base">
              Order Now <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
