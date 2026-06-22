import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      let q;
      if (user) {
        q = query(collection(db, 'tasks'), where('posterId', '==', user.uid));
      } else {
        // For demo, show all tasks
        q = collection(db, 'tasks');
      }
      const querySnapshot = await getDocs(q);
      const taskList = [];
      querySnapshot.forEach((doc) => {
        taskList.push({ id: doc.id, ...doc.data() });
      });
      setTasks(taskList);
    };
    if (user || !user) fetchTasks(); // Fetch even if no user for demo
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl mb-4">My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl">{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Description: {task.desc}</p>
            <p>Price: ${task.price}</p>
            <p>Status: {task.status}</p>
            <p>Location: {task.location.lat}, {task.location.lng}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTasks;