import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()
  return (
    <motion.header initial={{opacity:0}} animate={{opacity:1}} className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold" style={{color:'var(--brand)'}}>WorkConnect</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700">Home</Link>
          <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
          {user ? (
            <>
              <Link to="/post-job" className="text-gray-700">Post Job</Link>
              <button onClick={() => { logout(); nav('/'); }} className="text-gray-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700">Login</Link>
              <Link to="/signup" className="text-gray-700">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  )
}
