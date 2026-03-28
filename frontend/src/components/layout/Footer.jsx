import { Link } from 'react-router-dom';
import { MdRestaurant } from 'react-icons/md';
import { FiInstagram, FiFacebook, FiTwitter, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
                <MdRestaurant className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl text-white">Dadwals</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Lahore's favourite fast food destination since 2010. Serving happiness one bite at a time.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-400 hover:bg-brand-500/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/orders', 'Track Order'], ['/profile', 'My Profile']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-gray-500 hover:text-brand-400 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Pizza', 'Burger', 'Rolls', 'Drinks', 'Shakes', 'Sides'].map(c => (
                <li key={c}><Link to={`/menu?category=${c}`} className="text-gray-500 hover:text-brand-400 text-sm transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-500">
                <FiMapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                Main Blvd, Gulberg III, Lahore, Pakistan
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <FiPhone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                +92 42 3571 0000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <FiClock className="w-4 h-4 text-brand-400 flex-shrink-0" />
                11 AM – 2 AM (Daily)
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Dadwals Restaurant. All rights reserved. Built with ❤️ in Lahore.
        </div>
      </div>
    </footer>
  );
}
