const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Update driver location
// @route   PUT /api/driver/location
// @access  Private (Driver only)
exports.updateLocation = asyncHandler(async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can update location' });
  }

  const { lng, lat } = req.body;

  if (!lng || !lat) {
    return res.status(400).json({ message: 'Coordinates required' });
  }

  req.user.location = {
    type: 'Point',
    coordinates: [lng, lat]
  };

  await req.user.save();

  res.status(200).json({ success: true, message: 'Location updated' });
});
