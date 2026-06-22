import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import JobCard from '../components/JobCard';

const LandingPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.get(`${apiUrl}/jobs`, {
                params: { search }
            });
            setJobs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
        const element = document.getElementById('jobs-feed');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Hero */}
            <section className="relative pt-24 pb-32 overflow-hidden bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h1 className="text-6xl font-black text-secondary mb-8">
                            Aura <span className="text-primary italic">Job</span> Hub
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                            Connect with local professionals for any task.
                        </p>

                        <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border flex gap-2">
                            <input
                                type="text"
                                placeholder="What do you need?"
                                className="flex-1 px-4 py-3 outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button onClick={handleSearch} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Search</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Jobs Feed */}
            <section id="jobs-feed" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-black mb-10">Latest Opportunities</h2>

                    {loading ? (
                        <div className="text-center py-20 font-bold text-gray-400">Loading jobs...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
