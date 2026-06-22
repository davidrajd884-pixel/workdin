import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { haversineDistance } from '../utils/distance';

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [category, setCategory] = useState('');
  const [userLat, setUserLat] = useState('');
  const [userLng, setUserLng] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'worker'));
      const querySnapshot = await getDocs(q);
      const workerList = [];
      querySnapshot.forEach((doc) => {
        workerList.push({ id: doc.id, ...doc.data() });
      });
      setWorkers(workerList);
    };
    fetchWorkers();
  }, []);

  useEffect(() => {
    let filtered = workers;
    if (category) {
      filtered = filtered.filter(w => w.skills && w.skills.includes(category));
    }
    if (userLat && userLng) {
      filtered = filtered.map(w => ({
        ...w,
        distance: haversineDistance(parseFloat(userLat), parseFloat(userLng), w.location.lat, w.location.lng)
      })).sort((a, b) => a.distance - b.distance);
    }
    setFilteredWorkers(filtered);
  }, [workers, category, userLat, userLng]);

  const handleAssign = (workerId) => {
    // For demo, just alert. In real app, update task status
    alert(`Assigned to worker ${workerId}. In production, update task status in Firestore.`);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Find Workers</h2>
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border mr-2"
        >
          <option value="">All Categories</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="painter">Painter</option>
          <option value="driver">Driver</option>
        </select>
        <input
          type="number"
          step="any"
          placeholder="Your Latitude"
          value={userLat}
          onChange={(e) => setUserLat(e.target.value)}
          className="p-2 border mr-2"
        />
        <input
          type="number"
          step="any"
          placeholder="Your Longitude"
          value={userLng}
          onChange={(e) => setUserLng(e.target.value)}
          className="p-2 border"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl">{worker.name}</h3>
            <p>Skills: {worker.skills ? worker.skills.join(', ') : 'N/A'}</p>
            <p>Phone: {worker.phone}</p>
            <p>Verified: {worker.verified ? 'Yes' : 'No'}</p>
            {worker.distance !== undefined && <p>Distance: {worker.distance.toFixed(2)} km</p>}
            <button onClick={() => handleAssign(worker.id)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
              Assign Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workers;