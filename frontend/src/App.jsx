import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Home          from './pages/Home';
import Menu          from './pages/Menu';
import FoodDetail    from './pages/FoodDetail';
import Cart          from './pages/Cart';
import Login         from './pages/Login';
import Register      from './pages/Register';
import OrderTracking from './pages/OrderTracking';
import Profile       from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFoodForm  from './pages/admin/AdminFoodForm';
import AdminOrders    from './pages/admin/AdminOrders';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><div className="w-10 h-10 border-[3px] border-brand-500/30 border-t-brand-500 rounded-full animate-spin" /></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === 'admin' ? children : <Navigate to="/" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                   element={<Home />} />
      <Route path="/menu"               element={<Menu />} />
      <Route path="/food/:id"           element={<FoodDetail />} />
      <Route path="/cart"               element={<Cart />} />
      <Route path="/login"              element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register"           element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/orders"             element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
      <Route path="/profile"            element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/admin"              element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/food/new"     element={<AdminRoute><AdminFoodForm /></AdminRoute>} />
      <Route path="/admin/food/:id"     element={<AdminRoute><AdminFoodForm /></AdminRoute>} />
      <Route path="/admin/orders"       element={<AdminRoute><AdminOrders /></AdminRoute>} />
      <Route path="*"                   element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: '#1a1a1a', color: '#fff', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px' },
            }}
          />
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
