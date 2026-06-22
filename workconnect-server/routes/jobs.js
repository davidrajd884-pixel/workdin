const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getEmployerJobs, getJobById, applyToJob, deleteJob } = require('../controllers/jobController');
const { auth, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getAllJobs);
router.get('/employer', auth, authorize(['employer']), getEmployerJobs);
router.get('/:id', getJobById);
router.post('/', auth, authorize(['employer']), upload.single('image'), createJob);
router.post('/:id/apply', auth, authorize(['worker']), applyToJob);
router.delete('/:id', auth, authorize(['employer']), deleteJob);

module.exports = router;
