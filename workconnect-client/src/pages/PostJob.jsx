import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Image, MapPin, DollarSign, Type, AlignLeft, Send } from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    address: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Electrician', 'Plumber', 'Driver', 'Painter', 'Carpenter', 'Cleaner', 'Gardener', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('budget', formData.budget);
    data.append('location', JSON.stringify({ address: formData.address }));
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/jobs`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Job posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold mb-2">Post a New Job</h1>
        <p className="text-gray-500 mb-10 text-lg">Help local workers find your opportunity.</p>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="label-text">Job Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Need help fixing my kitchen sink"
                  className="input-field pl-12"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Category</label>
              <select
                required
                className="input-field appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="label-text">Budget (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  required
                  placeholder="500"
                  className="input-field pl-12"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Job Location / Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="Road No 12, Indiranagar, Bangalore"
                  className="input-field pl-12"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Detailed Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  required
                  rows="4"
                  placeholder="Describe the job in detail..."
                  className="input-field pl-12 py-4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Job Image (Optional)</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                <div className="space-y-1 text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-bold text-primary hover:text-primary-dark">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {image && <p className="text-sm text-green-600 font-semibold">{image.name}</p>}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-5 text-lg"
          >
            {loading ? 'Posting job...' : 'Post Job Listing'}
            {!loading && <Send className="w-5 h-5 ml-2" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
