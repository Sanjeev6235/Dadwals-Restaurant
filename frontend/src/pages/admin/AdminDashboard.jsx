import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiDollarSign, FiUsers, FiPlus, FiArrowRight } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import Loader from '../../components/common/Loader';
import { OrderStatusBadge } from '../../components/common/OrderStatus';
import api from '../../services/api';

function StatCard({ icon: Icon, label, value, color, sub }) {
  const colors = {
    orange: 'from-brand-500 to-brand-700',
    green:  'from-green-500 to-green-700',
    blue:   'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
  };
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-heading text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats]         = useState(null);
  const [recentOrders, setRecent] = useState([]);
  const [foods, setFoods]         = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/orders/admin/stats'),
      api.get('/food/admin/all'),
    ]).then(([statsRes, foodsRes]) => {
      setStats(statsRes.data.stats);
      setRecent(statsRes.data.recentOrders);
      setFoods(foodsRes.data.foods);
    }).catch(() => toast.error('Failed to load dashboard'))
    .finally(() => setLoading(false));
  }, []);

  const handleDeleteFood = async (id) => {
    if (!confirm('Delete this food item?')) return;
    try {
      await api.delete(`/food/${id}`);
      setFoods(f => f.filter(x => x._id !== id));
      toast.success('Food item deleted');
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <><Navbar /><Loader full /></>;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage Dadwals Restaurant</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/food/new" className="btn-primary text-sm">
              <FiPlus className="w-4 h-4" /> Add Food Item
            </Link>
            <Link to="/admin/orders" className="btn-outline text-sm">
              <FiPackage className="w-4 h-4" /> All Orders
            </Link>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard icon={FiPackage}     label="Total Orders"  value={stats.totalOrders}         color="orange" />
            <StatCard icon={FiShoppingBag} label="Delivered"     value={stats.delivered}            color="green"  />
            <StatCard icon={FiDollarSign}  label="Revenue"       value={`Rs. ${stats.totalRevenue}`} color="blue"   sub="From delivered orders" />
            <StatCard icon={MdRestaurantMenu} label="Menu Items" value={foods.length}               color="purple" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-heading font-bold text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
                View All <FiArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                <p className="text-center text-gray-600 py-8 text-sm">No orders yet</p>
              ) : recentOrders.map(order => (
                <div key={order._id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white text-sm font-semibold">#{order.orderNumber}</p>
                    <p className="text-gray-500 text-xs">{order.userId?.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-brand-400 font-bold text-sm">Rs. {order.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food items quick list */}
          <div className="card">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-heading font-bold text-white">Menu Items</h2>
              <Link to="/admin/food/new" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
                <FiPlus className="w-3 h-3" /> Add New
              </Link>
            </div>
            <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
              {foods.slice(0, 10).map(food => (
                <div key={food._id} className="p-3 flex items-center gap-3">
                  <img src={food.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&q=60'}
                    alt={food.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{food.name}</p>
                    <p className="text-gray-500 text-xs">{food.category}</p>
                  </div>
                  <span className="text-brand-400 text-sm font-bold whitespace-nowrap">Rs. {food.price}</span>
                  <div className="flex gap-1">
                    <Link to={`/admin/food/${food._id}`} className="p-1.5 text-gray-500 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg text-xs transition-colors">Edit</Link>
                    <button onClick={() => handleDeleteFood(food._id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-xs transition-colors">Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
