const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, category, address, lat, lng, budget, image } = req.body;
    const job = await Job.create({
      title,
      description,
      category,
      location: { address, lat, lng },
      budget,
      image,
      employer: req.user._id
    });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.employer.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await job.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.applicants.includes(req.user._id)) return res.status(400).json({ message: 'Already applied' });
    job.applicants.push(req.user._id);
    await job.save();
    res.json({ message: 'Applied' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};