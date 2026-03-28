import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm]       = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.token, data.user);
      toast.success('Account created! Welcome to Dadwals 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name',    icon: FiUser,   type: 'text',     label: 'Full Name',        ph: 'Ahmed Khan' },
    { key: 'email',   icon: FiMail,   type: 'email',    label: 'Email Address',    ph: 'ahmed@example.com' },
    { key: 'phone',   icon: FiPhone,  type: 'tel',      label: 'Phone Number',     ph: '+92 3XX XXXXXXX' },
    { key: 'address', icon: FiMapPin, type: 'text',     label: 'Delivery Address', ph: 'DHA Phase 5, Lahore' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <div className="hidden lg:flex flex-1 relative">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80"
          alt="Food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent" />
        <div className="absolute bottom-12 left-12">
          <h2 className="font-display text-5xl text-white mb-3">Join the<br />Dadwals Family</h2>
          <p className="text-gray-300">Create an account and start ordering in seconds.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md animate-slide-up">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <MdRestaurant className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl text-white">Dadwals Restaurant</span>
          </Link>

          <h1 className="font-heading text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">Start ordering your favourite food today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, icon: Icon, type, label, ph }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type={type} className="input pl-11" placeholder={ph}
                    value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required={['name','email'].includes(key)} />
                </div>
              </div>
            ))}

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} className="input pl-11 pr-11" placeholder="Min 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 rounded-xl text-base mt-2">
              {loading
                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
