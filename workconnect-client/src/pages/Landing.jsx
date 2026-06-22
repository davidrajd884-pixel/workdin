import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      <section>
        <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className="text-4xl font-bold mb-4" style={{color:'var(--brand)'}}>
          Find local skilled help, fast
        </motion.h1>
        <p className="mb-6 text-gray-700">Post jobs or find work near you. Smooth, fast, and reliable.</p>
        <div className="space-x-4">
          <Link to="/signup" className="px-4 py-2 bg-red-600 text-white rounded">Get Started</Link>
          <Link to="/dashboard" className="px-4 py-2 border rounded">Explore Jobs</Link>
        </div>
      </section>
      <motion.div initial={{scale:0.95}} animate={{scale:1}} className="card p-6">
        <img src="/hero.png" alt="hero" className="w-full rounded" />
      </motion.div>
    </div>
  )
}
