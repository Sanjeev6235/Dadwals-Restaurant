import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import Loader from '../../components/common/Loader';
import api from '../../services/api';

const CATEGORIES = ['Pizza', 'Burger', 'Rolls', 'Drinks', 'Shakes', 'Sides', 'Desserts'];
const EMPTY = { name: '', description: '', price: '', category: 'Burger', prepTime: '20-30 min', isAvailable: true, isFeatured: false };

export default function AdminFoodForm() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const isEdit       = Boolean(id);

  const [form, setForm]       = useState(EMPTY);
  const [image, setImage]     = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/food/${id}`)
      .then(r => {
        const f = r.data.food;
        setForm({ name: f.name, description: f.description, price: f.price, category: f.category, prepTime: f.prepTime, isAvailable: f.isAvailable, isFeatured: f.isFeatured });
        setPreview(f.image);
      })
      .catch(() => toast.error('Failed to load item'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) { toast.error('Fill all required fields'); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);

      if (isEdit) {
        await api.put(`/food/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Food updated!');
      } else {
        await api.post('/food', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Food item added!');
      }
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  if (loading) return <><Navbar /><Loader full /></>;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="section-title mb-8">{isEdit ? 'Edit Food Item' : 'Add New Food Item'}</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image upload */}
          <div className="card p-5">
            <label className="label">Food Image</label>
            <div className="flex items-start gap-5">
              {preview ? (
                <img src={preview} alt="preview" className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-28 h-28 rounded-xl bg-dark-700 border border-dashed border-white/20 flex items-center justify-center flex-shrink-0">
                  <FiUpload className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <div>
                <label className="btn-outline text-sm cursor-pointer">
                  <FiUpload className="w-4 h-4" /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                <p className="text-xs text-gray-600 mt-2">JPG, PNG or WebP. Max 5MB.<br />Uploaded to Cloudinary.</p>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="card p-5 space-y-4">
            <div>
              <label className="label">Item Name *</label>
              <input className="input" placeholder="e.g. Cheese Burst Pizza"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="label">Description *</label>
              <textarea className="input resize-none" rows={3} placeholder="Describe the dish…"
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Price (Rs.) *</label>
                <input type="number" className="input" placeholder="299" min="1"
                  value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div>
                <label className="label">Category *</label>
                <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Prep Time</label>
              <input className="input" placeholder="20-30 min"
                value={form.prepTime} onChange={e => setForm({ ...form, prepTime: e.target.value })} />
            </div>
          </div>

          {/* Toggles */}
          <div className="card p-5 flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input type="checkbox" checked={form.isAvailable}
                onChange={e => setForm({ ...form, isAvailable: e.target.checked })}
                className="w-5 h-5 rounded accent-brand-500" />
              <div>
                <p className="text-white text-sm font-semibold">Available</p>
                <p className="text-gray-500 text-xs">Show on menu</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input type="checkbox" checked={form.isFeatured}
                onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-5 h-5 rounded accent-brand-500" />
              <div>
                <p className="text-white text-sm font-semibold">Featured</p>
                <p className="text-gray-500 text-xs">Show on homepage</p>
              </div>
            </label>
          </div>

          <div className="flex gap-3">
            <Link to="/admin" className="btn-outline flex-1 py-3 text-center">Cancel</Link>
            <button type="submit" disabled={saving} className="btn-primary flex-1 py-3">
              {saving ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave className="w-4 h-4" />}
              {saving ? 'Saving…' : isEdit ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
