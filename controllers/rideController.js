const asyncHandler = require('express-async-handler')
const Ride = require('../models/Ride')
const User = require('../models/user')

// Importing design pattern modules
const VehicleFactory = require('../patterns/factory/vehicleFactory')
const PricingContext = require('../patterns/strategy/pricingContext')
const NormalPricing = require('../patterns/strategy/normalPricing')
const Logger = require('../patterns/singleton/logger')

// Rider books a new ride
exports.bookRide = asyncHandler(async (req, res) => {
  // Allow only riders to book rides
  if (req.user.role !== 'rider') {
    return res.status(403).json({ message: 'Only riders can book rides' })
  }

  // Extract pickup coordinates and vehicle type from request body
  const { lng, lat, vehicleType = 'car' } = req.body
  if (!lng || !lat) {
    return res.status(400).json({ message: 'Pickup coordinates required' })
  }

  // Find the nearest available driver within 5km radius
  const nearbyDriver = await User.findOne({
    role: 'driver',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 5000
      }
    }
  })

  if (!nearbyDriver) {
    return res.status(404).json({ message: 'No nearby drivers found' })
  }

  // Use the Factory Pattern to get the correct vehicle type
  const vehicle = VehicleFactory.getVehicle(vehicleType)
  vehicle.ride() // Simulates starting the ride (prints to console)

  // Use the Strategy Pattern to calculate the fare dynamically
  const pricing = new PricingContext(new NormalPricing())
  const fare = pricing.getFare(nearbyDriver.estimatedDistance || 10) // assume 10km if no distance data

  // Create and save the ride in database
  const ride = await Ride.create({
    rider: req.user._id,
    driver: nearbyDriver._id,
    pickupLocation: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    status: 'ongoing',
    fare
  })

  // Log ride booking using Singleton Logger
  Logger.log(`Ride booked by ${req.user.name} (UserID: ${req.user._id})`)

  // Send response with ride and driver details
  res.status(201).json({
    success: true,
    message: 'Ride booked successfully',
    rideId: ride._id,
    driver: {
      id: nearbyDriver._id,
      name: nearbyDriver.name,
      vehicle: nearbyDriver.vehicleModel || 'N/A',
      contact: nearbyDriver.email
    },
    fare: ride.fare
  })
})

// Get all rides for the logged-in user (either rider or driver)
exports.getMyRides = asyncHandler(async (req, res) => {
  let filter = {}

  if (req.user.role === 'rider') {
    filter.rider = req.user._id
  } else if (req.user.role === 'driver') {
    filter.driver = req.user._id
  } else {
    return res.status(403).json({ message: 'Access denied' })
  }

  // Fetch all rides related to the user
  const rides = await Ride.find(filter)
    .populate('driver', 'name email')
    .populate('rider', 'name email')
    .sort({ bookedAt: -1 })

  res.status(200).json({
    success: true,
    count: rides.length,
    rides
  })
})

// Driver marks a ride as completed
exports.completeRide = asyncHandler(async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can complete rides' })
  }

  const ride = await Ride.findById(req.params.id)

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' })
  }

  // Only the assigned driver can complete the ride
  if (ride.driver.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Update the ride status to completed
  ride.status = 'completed'
  ride.completedAt = new Date()

  await ride.save()

  res.status(200).json({
    success: true,
    message: 'Ride marked as completed',
    rideId: ride._id
  })
})
