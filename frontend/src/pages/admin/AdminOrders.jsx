import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import Loader from '../../components/common/Loader';
import { OrderStatusBadge } from '../../components/common/OrderStatus';
import api from '../../services/api';

const STATUSES = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [updating, setUpdating] = useState('');

  useEffect(() => {
    api.get('/orders/admin/all')
      .then(r => setOrders(r.data.orders))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    setUpdating(orderId);
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { status });
      setOrders(prev => prev.map(o => o._id === orderId ? data.order : o));
      toast.success(`Order status → ${status}`);
    } catch { toast.error('Update failed'); }
    finally { setUpdating(''); }
  };

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'All' || o.status === filter;
    const matchSearch = o.orderNumber?.includes(search) ||
      o.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.userId?.email?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (loading) return <><Navbar /><Loader full /></>;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="section-title">All Orders</h1>
            <p className="text-gray-500 text-sm mt-0.5">{orders.length} total orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input className="input pl-11" placeholder="Search by order #, name…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', ...STATUSES].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === s ? 'bg-brand-500 text-white' : 'bg-dark-800 text-gray-400 border border-white/5 hover:border-brand-500/30'
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div className="card overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-600 py-12">No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-700">
                  <tr>
                    {['Order #', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Action'].map(h => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(order => (
                    <tr key={order._id} className="hover:bg-white/2 transition-colors">
                      <td className="px-4 py-4">
                        <p className="text-white font-semibold text-sm">#{order.orderNumber}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-white text-sm">{order.userId?.name}</p>
                        <p className="text-gray-500 text-xs">{order.userId?.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-300 text-sm">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        <p className="text-gray-600 text-xs truncate max-w-[160px]">
                          {order.items.map(i => i.name).join(', ')}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-brand-400 font-bold text-sm">Rs. {order.totalPrice}</p>
                        <p className="text-gray-600 text-xs">{order.paymentMethod}</p>
                      </td>
                      <td className="px-4 py-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-4 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('en-PK', { day:'numeric', month:'short', year:'numeric' })}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.status}
                          onChange={e => handleStatusUpdate(order._id, e.target.value)}
                          disabled={updating === order._id || order.status === 'Delivered' || order.status === 'Cancelled'}
                          className="bg-dark-700 border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
