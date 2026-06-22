import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PostTask from './pages/PostTask';
import Workers from './pages/Workers';
import MyTasks from './pages/MyTasks';
import WorkerRegister from './pages/WorkerRegister';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-task" element={<PostTask />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/register-worker" element={<WorkerRegister />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;