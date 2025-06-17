const express = require('express');
const router = express.Router();
const { bookRide, getMyRides } = require('../controllers/rideController');
const protect = require('../middleware/protect');
const { completeRide } = require('../controllers/rideController');

router.post('/book', protect, bookRide);

router.get('/my', protect, getMyRides);

router.put('/complete/:id', protect, completeRide);

module.exports = router;
