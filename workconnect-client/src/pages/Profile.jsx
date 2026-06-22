import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Camera, Save, MapPin, Phone, User as UserIcon, LogOut, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    skills: user?.skills?.join(', ') || '',
    address: user?.location?.address || ''
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('skills', formData.skills);
    data.append('location', JSON.stringify({ address: formData.address }));
    if (avatar) data.append('avatar', avatar);

    try {
      await updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar / Photo */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="relative inline-block mb-6 group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-primary/10 shadow-inner">
                {preview ? (
                  <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
                <input type="file" className="sr-only" onChange={handleImageChange} />
              </label>
            </div>

            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-gray-500 font-medium mb-6 flex items-center justify-center gap-1">
              <span className="capitalize">{user?.role}</span>
              <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
            </p>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <button
                onClick={logout}
                className="w-full py-3 px-4 rounded-xl text-primary font-bold bg-primary/5 hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Content / Form */}
        <div className="md:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="input-field pl-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="label-text">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="+91 9876543210"
                      className="input-field pl-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label-text">Your Address / General Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Area, City"
                    className="input-field pl-12"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              {user?.role === 'worker' && (
                <div>
                  <label className="label-text">Skills (Separate by comma)</label>
                  <textarea
                    rows="3"
                    placeholder="Electrician, Plumbing, Carpentry..."
                    className="input-field py-4"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 mt-4"
              >
                {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                {!loading && <Save className="w-5 h-5 ml-2" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
