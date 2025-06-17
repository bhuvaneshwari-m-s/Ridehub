const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const rideRoutes = require('./routes/rideRoutes');


dotenv.config(); // Load .env file

const app = express();
app.use(express.json()); // Parses JSON in requests

const connectDB = require('./config/db.js'); // Custom DB function
connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);

app.use('/api/driver', driverRoutes);

app.use('/api/rides', rideRoutes);

app.get('/', (req, res) => {
  res.send('RideHub API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
