import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name}! 🍔`);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Left visual */}
      <div className="hidden lg:flex flex-1 relative">
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80"
          alt="Food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/50 to-transparent" />
        <div className="absolute bottom-12 left-12">
          <h2 className="font-display text-5xl text-white mb-3">Good Food.<br />Good Mood.</h2>
          <p className="text-gray-300 text-lg">Order from Lahore's favourite fast food restaurant.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-slide-up">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <MdRestaurant className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl text-white">Dadwals Restaurant</span>
          </Link>

          <h1 className="font-heading text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-500 mb-8">Sign in to order your favourites</p>

          {/* Demo */}
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-brand-400 mb-1">Demo Accounts</p>
            <p className="text-xs text-gray-400">Admin: admin@dadwals.com / admin1234</p>
            <p className="text-xs text-gray-400">User: ahmed@test.com / test1234</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" className="input pl-11" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} className="input pl-11 pr-11" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 rounded-xl text-base">
              {loading
                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to Dadwals?{' '}
            <Link to="/register" className="text-brand-400 font-semibold hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
