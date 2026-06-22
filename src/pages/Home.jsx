import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Aura Jobs</h1>
      <p className="mb-8">Post small tasks like electrician, plumber, painter, driver and find nearby workers.</p>
      <div className="space-x-4">
        <Link to="/post-task" className="bg-blue-600 text-white px-4 py-2 rounded">Post a Task</Link>
        <Link to="/workers" className="bg-green-600 text-white px-4 py-2 rounded">Find Workers</Link>
        <Link to="/register-worker" className="bg-purple-600 text-white px-4 py-2 rounded">Register as Worker</Link>
      </div>
    </div>
  );
}

export default Home;