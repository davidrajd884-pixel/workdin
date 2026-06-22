const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['worker', 'employer'], default: 'worker' },
  skills: { type: [String], default: [] },
  phone: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
