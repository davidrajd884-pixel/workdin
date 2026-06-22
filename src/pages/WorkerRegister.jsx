import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function WorkerRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState('');

  const skillOptions = ['electrician', 'plumber', 'painter', 'driver'];

  const handleSkillChange = (skill) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        role: 'worker',
        skills,
        phone,
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        verified: false,
        createdAt: new Date()
      });

      alert('Worker registered successfully!');
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setSkills([]);
      setPhone('');
      setLat('');
      setLng('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register as Worker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <div className="mb-2">
          <label className="block mb-1">Skills:</label>
          {skillOptions.map(skill => (
            <label key={skill} className="inline-block mr-4">
              <input
                type="checkbox"
                checked={skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <button type="submit" className="w-full bg-green-600 text-white p-2">Register</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default WorkerRegister;