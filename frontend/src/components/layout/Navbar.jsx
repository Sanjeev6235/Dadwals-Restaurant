import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiSettings, FiPackage } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems }            = useCart();
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const [open, setOpen]           = useState(false);
  const [dropdown, setDropdown]   = useState(false);

  const isActive = p => location.pathname === p;

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  const navLinks = [
    { to: '/',     label: 'Home' },
    { to: '/menu', label: 'Menu' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
              <MdRestaurant className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg leading-none text-white">Dadwals</span>
              <span className="block text-[10px] text-brand-400 font-semibold tracking-widest uppercase">Restaurant</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to) ? 'bg-brand-500/20 text-brand-400' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >{label}</Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-sm">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative hidden md:block">
                <button onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300">{user.name?.split(' ')[0]}</span>
                </button>

                {dropdown && (
                  <div className="absolute right-0 top-12 w-52 card border-white/10 shadow-xl py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-400 hover:bg-white/5 transition-colors">
                        <FiSettings className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <Link to="/orders" onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      <FiPackage className="w-4 h-4" /> My Orders
                    </Link>
                    <Link to="/profile" onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      <FiUser className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                      <FiLogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link to="/login"    className="btn-ghost text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </div>
            )}

            {/* Mobile burger */}
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5">
              {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-white/5 space-y-1 animate-slide-up">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                {label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-brand-400">Admin Panel</Link>}
                <Link to="/orders"  onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300">My Orders</Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"    onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-brand-400 font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
