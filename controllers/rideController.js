const asyncHandler = require('express-async-handler');
const Ride = require('../models/Ride');
const User = require('../models/user');

// @desc    Rider books a ride
// @route   POST /api/rides/book
// @access  Private (Rider only)
exports.bookRide = asyncHandler(async (req, res) => {
  if (req.user.role !== 'rider') {
    return res.status(403).json({ message: 'Only riders can book rides' });
  }

  const { lng, lat } = req.body;
  if (!lng || !lat) {
    return res.status(400).json({ message: 'Pickup coordinates required' });
  }

  // Find nearest driver within 5km
  const nearbyDriver = await User.findOne({
    role: 'driver',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 5000 // in meters
      }
    }
  });

  if (!nearbyDriver) {
    return res.status(404).json({ message: 'No nearby drivers found' });
  }

  // Create Ride
  const ride = await Ride.create({
    rider: req.user._id,
    driver: nearbyDriver._id,
    pickupLocation: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    status: 'ongoing',
    fare: Math.floor(100 + Math.random() * 200) // Simulated fare
  });

  res.status(201).json({
    success: true,
    message: 'Ride booked successfully',
    rideId: ride._id,
    driver: {
      id: nearbyDriver._id,
      name: nearbyDriver.name,
      vehicle: nearbyDriver.vehicleModel || 'N/A',
      contact: nearbyDriver.email // optional
    },
    fare: ride.fare
  });
});

exports.getMyRides = asyncHandler(async (req, res) => {
  let filter = {};

  if (req.user.role === 'rider') {
    filter.rider = req.user._id;
  } else if (req.user.role === 'driver') {
    filter.driver = req.user._id;
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }

  const rides = await Ride.find(filter)
    .populate('driver', 'name email')
    .populate('rider', 'name email')
    .sort({ bookedAt: -1 });

  res.status(200).json({
    success: true,
    count: rides.length,
    rides
  });
});

exports.completeRide = asyncHandler(async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can complete rides' });
  }

  const ride = await Ride.findById(req.params.id);

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  if (ride.driver.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  ride.status = 'completed';
  ride.completedAt = new Date();

  await ride.save();

  res.status(200).json({
    success: true,
    message: 'Ride marked as completed',
    rideId: ride._id
  });
});
