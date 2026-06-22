import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Aura Jobs</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/post-task" className="hover:underline">Post Task</Link>
          <Link to="/workers" className="hover:underline">Workers</Link>
          <Link to="/my-tasks" className="hover:underline">My Tasks</Link>
          <Link to="/register-worker" className="hover:underline">Register as Worker</Link>
          {user ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <span>Login/Signup</span>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;