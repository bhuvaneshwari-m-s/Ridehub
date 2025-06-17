const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'cancelled'],
    default: 'ongoing'
  },
  fare: {
    type: Number,
    default: 0
  },
  bookedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

rideSchema.index({ pickupLocation: '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
