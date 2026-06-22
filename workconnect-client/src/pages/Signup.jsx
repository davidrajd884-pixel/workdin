import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, ArrowRight, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'worker' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Briefcase className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tighter italic text-secondary">Work<span className="text-primary">Connect</span></span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Join our community</h2>
          <p className="text-gray-500 mt-2">Start your journey with us today.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-text">Full Name</label>
              <div className="relative">
                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="input-field pl-12"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input-field pl-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-field pl-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-text">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'worker' })}
                  className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${formData.role === 'worker' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                >
                  Find Work
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'employer' })}
                  className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${formData.role === 'employer' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                >
                  Hire Help
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 mt-4"
            >
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
