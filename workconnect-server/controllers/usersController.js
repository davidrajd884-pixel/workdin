const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { name, skills, phone, lat, lng, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.name = name || user.name;
    user.skills = skills || user.skills;
    user.phone = phone || user.phone;
    user.location = { lat: lat || user.location.lat, lng: lng || user.location.lng };
    user.avatar = avatar || user.avatar;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('-password');
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};