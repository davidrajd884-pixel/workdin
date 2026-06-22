import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function PostTask() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to post a task');
      return;
    }
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        category,
        desc: description,
        price: parseFloat(price),
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        status: 'open',
        posterId: user.uid,
        createdAt: serverTimestamp()
      });
      alert('Task posted!');
      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setPrice('');
      setLat('');
      setLng('');
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Post a Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        >
          <option value="">Select Category</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="painter">Painter</option>
          <option value="driver">Driver</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Post Task</button>
      </form>
    </div>
  );
}

export default PostTask;