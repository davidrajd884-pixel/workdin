const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController');

router.get('/me', auth, usersController.getProfile);
router.put('/me', auth, usersController.updateProfile);
router.get('/workers', usersController.getWorkers);

module.exports = router;
