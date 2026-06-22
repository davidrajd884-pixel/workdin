import { motion } from 'framer-motion';
import { MapPin, Clock, User, ShieldCheck, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-100 group relative"
        >
            <Link to={`/job/${job._id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Category Tag */}
                    <div className="absolute top-5 left-5 z-10">
                        <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest text-[#EF4F5F] shadow-sm border border-white/20">
                            {job.category}
                        </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-5 right-5 z-10">
                        <span className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-white shadow-sm flex items-center gap-1">
                            ₹{job.budget}
                        </span>
                    </div>

                    {job.image ? (
                        <img
                            src={job.image}
                            alt={job.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s] ease-out"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-2">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Briefcase className="w-8 h-8 text-gray-200" />
                            </div>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-black text-secondary line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {job.title}
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-400 mb-8 font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary" />
                            {job.location?.address?.split(',')[0]}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {job.employer?.avatar ? (
                                    <img src={job.employer.avatar} alt={job.employer.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                                    <ShieldCheck className="w-2.5 h-2.5 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-secondary leading-none mb-1">{job.employer?.name}</span>
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1">
                                    Verified Host
                                </span>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ x: 5 }}
                            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default JobCard;
