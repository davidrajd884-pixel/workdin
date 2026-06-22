import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, PlusCircle, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <Briefcase className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Work<span className="text-primary">Connect</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Explore</Link>
                        {user ? (
                            <>
                                {user.role === 'employer' ? (
                                    <Link to="/post-job" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                        <PlusCircle className="w-5 h-5" /> Post Job
                                    </Link>
                                ) : (
                                    <Link to="/applied-jobs" className="hover:text-primary transition-colors">Applied</Link>
                                )}
                                <div className="flex items-center gap-4">
                                    <Link to="/profile" className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-200 hover:border-primary transition-all">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                        )}
                                        <span className="text-sm font-semibold">{user?.name?.split(' ')[0] || 'User'}</span>
                                    </Link>
                                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                        <LogOut className="w-6 h-6" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="px-6 py-2.5 rounded-xl hover:bg-gray-50 font-semibold transition-all">Login</Link>
                                <Link to="/signup" className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-md active:scale-95">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link to="/" className="block py-3 font-medium border-b border-gray-50">Explore</Link>
                            {user ? (
                                <>
                                    <Link to="/profile" className="block py-3 font-medium border-b border-gray-50">Profile</Link>
                                    {user.role === 'employer' ? (
                                        <Link to="/post-job" className="block py-3 font-medium border-b border-gray-50">Post a Job</Link>
                                    ) : (
                                        <Link to="/applied-jobs" className="block py-3 font-medium border-b border-gray-50">Applied Jobs</Link>
                                    )}
                                    <button onClick={handleLogout} className="w-full text-left py-3 font-medium text-primary">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block py-3 font-medium border-b border-gray-50">Login</Link>
                                    <Link to="/signup" className="block py-3 font-medium font-bold text-primary">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
