const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const rideRoutes = require('./routes/rideRoutes');
const cors = require('cors');
app.use(cors());

dotenv.config(); // Load .env file

const app = express();
app.use(express.json()); // Parses JSON in requests

const connectDB = require('./config/db.js'); // Custom DB function
connectDB();

const PORT = process.env.PORT || 5000;

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

app.use('/api/auth', authRoutes);

app.use('/api/driver', driverRoutes);

app.use('/api/rides', rideRoutes);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>RideHub API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background-color: #f4f4f4;
            color: #333;
          }
          h1 {
            color: #007bff;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <h1>🚗 RideHub API is Running</h1>
        <p>This is the backend server for the <strong>RideHub</strong> project.</p>
        <p>It is built using <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>.</p>
        <p>Check out the full project source code on <a href="https://github.com/bhuvaneshwari-m-s/Ridehub" target="_blank">GitHub</a>.</p>
        <p>🔐 Authentication: <code>/api/auth</code></p>
        <p>🧑‍✈️ Driver routes: <code>/api/driver</code></p>
        <p>🚕 Ride routes: <code>/api/rides</code></p>
      </body>
    </html>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
