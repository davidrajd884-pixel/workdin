import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronLeft, Shield, Send, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, API_URL]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/jobs/${id}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Application submitted successfully!');
      // Refresh job data
      const res = await axios.get(`${API_URL}/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!job) return <div className="text-center py-20">Job not found.</div>;

  const hasApplied = job.applicants?.some(a => a._id === user?.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-bold">
        <ChevronLeft className="w-5 h-5" /> Back to Search
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Info */}
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide">
                {job.category}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 font-bold text-sm tracking-wide flex items-center gap-1">
                <Shield className="w-4 h-4" /> Secure Payment
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-secondary leading-tight mb-8">
              {job.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gray-50 rounded-[32px]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Budget</span>
                <span className="text-xl font-black text-green-600">₹{job.budget}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</span>
                <span className="text-xl font-bold flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" /> {job.location?.address?.split(',')[0]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Posted</span>
                <span className="text-xl font-bold flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</span>
                <span className="text-xl font-bold text-blue-600">Open</span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {job.image && (
              <div className="mb-12 rounded-[32px] overflow-hidden">
                <img src={job.image} alt="Job" className="w-full h-auto" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Apply for this Job</h3>

              {user?.role === 'worker' ? (
                <button
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-lg font-black transition-all ${hasApplied
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark active:scale-95'
                    }`}
                >
                  {hasApplied ? 'Actually Applied' : 'Submit Application'}
                  {!hasApplied && <Send className="w-5 h-5" />}
                </button>
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <p className="text-gray-500 font-medium">Please login as a <span className="text-primary font-bold">Worker</span> to apply for this job.</p>
                </div>
              )}

              <p className="text-center text-xs text-gray-400 mt-6">
                By applying, you agree to our terms of service and professional standards.
              </p>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">About the Host</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-50 shadow-sm">
                  {job.employer?.avatar ? (
                    <img src={job.employer.avatar} alt={job.employer.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-gray-300" /></div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-xl">{job.employer?.name}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1 font-medium italic"><Shield className="w-4 h-4 text-blue-500" /> Verified Host</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm py-3 border-b border-gray-50">
                  <span className="text-gray-500">Jobs Posted</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between text-sm py-3 border-b border-gray-50">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-bold text-primary">★ 4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
