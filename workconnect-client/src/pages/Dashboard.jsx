import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { Search, Filter, Briefcase, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/jobs`, {
        params: { search, category }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchJobs();
  }, [category, fetchJobs]); // Update on category change, search manually or debounce

  const categories = ['Electrician', 'Plumber', 'Driver', 'Painter', 'Carpenter', 'Cleaner', 'Gardener'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            placeholder="Search for services or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchJobs()}
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="bg-white border border-gray-100 shadow-sm rounded-2xl py-4 pl-12 pr-10 outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            onClick={fetchJobs}
            className="bg-secondary text-white p-4 rounded-2xl hover:bg-black transition-colors"
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <Briefcase className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Available Opportunities</h2>
        <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">{jobs.length} jobs found</span>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-gray-100 rounded-3xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
