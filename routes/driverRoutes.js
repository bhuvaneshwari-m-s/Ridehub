const express = require('express');
const router = express.Router();
const { updateLocation } = require('../controllers/driverController');
const protect = require('../middleware/protect');

router.put('/location', protect, updateLocation);

module.exports = router;
