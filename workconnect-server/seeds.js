require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Job = require('./models/Job');

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await Job.deleteMany();

  const password = require('bcryptjs').hashSync('password', 10);

  const users = await User.create([
    { name: 'Raju Electrician', email: 'raju@example.com', password, role: 'worker', skills: ['electrician'], phone: '+919876543210', location: { lat: 28.6139, lng: 77.2090 }, verified: true },
    { name: 'Sunil Plumber', email: 'sunil@example.com', password, role: 'worker', skills: ['plumber'], phone: '+919876543211', location: { lat: 28.6140, lng: 77.2091 }, verified: true },
    { name: 'Kavya Painter', email: 'kavya@example.com', password, role: 'worker', skills: ['painter'], phone: '+919876543212', location: { lat: 28.6141, lng: 77.2092 }, verified: true },
    { name: 'Employer Demo', email: 'employer@example.com', password, role: 'employer' }
  ]);

  await Job.create([
    { title: 'Fix Kitchen Light', description: 'Replace bulb and check wiring', category: 'electrician', location: { address: 'Connaught Place', lat: 28.6323, lng: 77.2197 }, budget: 500, employer: users[3]._id },
    { title: 'Bathroom Leak', description: 'Fix pipe leak', category: 'plumber', location: { address: 'South Delhi', lat: 28.5934, lng: 77.2031 }, budget: 800, employer: users[3]._id }
  ]);

  console.log('Seed complete');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
