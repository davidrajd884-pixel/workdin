const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { title, description, category, budget, location } = req.body;
        const jobData = {
            title,
            description,
            category,
            budget,
            location: typeof location === 'string' ? JSON.parse(location) : location,
            employer: req.user.id
        };

        if (req.file) {
            jobData.image = req.file.path;
        }

        const job = new Job(jobData);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const jobs = await Job.find(query).populate('employer', 'name avatar').sort('-createdAt');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user.id }).sort('-createdAt');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email avatar phone').populate('applicants', 'name avatar skills phone');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.applicants.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already applied' });
        }

        job.applicants.push(req.user.id);
        await job.save();
        res.json({ message: 'Applied successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user.id });
        if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
