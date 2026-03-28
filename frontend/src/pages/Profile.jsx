import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' });
  const [pw, setPw]           = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [savingP, setSavingP] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [tab, setTab]         = useState('profile');

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingP(true);
    try {
      const { data } = await api.put('/users/profile', profile);
      updateUser(data.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setSavingP(false); }
  };

  const handlePwSave = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) { toast.error('Passwords do not match'); return; }
    if (pw.newPassword.length < 6) { toast.error('Password must be at least 6 chars'); return; }
    setSavingPw(true);
    try {
      await api.put('/users/change-password', { currentPassword: pw.currentPassword, newPassword: pw.newPassword });
      toast.success('Password changed!');
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally { setSavingPw(false); }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="section-title mb-8">My Profile</h1>

        {/* Avatar card */}
        <div className="card p-6 flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-heading text-xl font-bold text-white">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className={`badge mt-1.5 text-xs ${user?.role === 'admin' ? 'bg-brand-500/20 text-brand-400' : 'bg-green-500/20 text-green-400'}`}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-800 p-1 rounded-xl mb-6">
          {['profile', 'password'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >{t === 'profile' ? 'Personal Info' : 'Change Password'}</button>
          ))}
        </div>

        {tab === 'profile' ? (
          <div className="card p-6">
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="label flex items-center gap-1.5"><FiUser className="w-3.5 h-3.5 text-brand-400" /> Full Name</label>
                <input className="input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
              </div>
              <div>
                <label className="label flex items-center gap-1.5"><FiMail className="w-3.5 h-3.5 text-brand-400" /> Email</label>
                <input className="input opacity-60 cursor-not-allowed" value={user?.email} disabled />
              </div>
              <div>
                <label className="label flex items-center gap-1.5"><FiPhone className="w-3.5 h-3.5 text-brand-400" /> Phone</label>
                <input className="input" placeholder="+92 3XX XXXXXXX" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <label className="label flex items-center gap-1.5"><FiMapPin className="w-3.5 h-3.5 text-brand-400" /> Address</label>
                <textarea className="input resize-none" rows={3} value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
              </div>
              <button type="submit" disabled={savingP} className="btn-primary w-full py-3">
                <FiSave className="w-4 h-4" /> {savingP ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </div>
        ) : (
          <div className="card p-6">
            <form onSubmit={handlePwSave} className="space-y-4">
              {[['currentPassword', 'Current Password'], ['newPassword', 'New Password'], ['confirm', 'Confirm Password']].map(([key, label]) => (
                <div key={key}>
                  <label className="label flex items-center gap-1.5"><FiLock className="w-3.5 h-3.5 text-brand-400" /> {label}</label>
                  <input type="password" className="input" placeholder="••••••••"
                    value={pw[key]} onChange={e => setPw({ ...pw, [key]: e.target.value })} required />
                </div>
              ))}
              <button type="submit" disabled={savingPw} className="btn-primary w-full py-3">
                <FiLock className="w-4 h-4" /> {savingPw ? 'Changing…' : 'Change Password'}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
