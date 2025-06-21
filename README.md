# 🚗 RideHub - Uber-like Ride Booking Backend

RideHub is a fully functional backend system for a ride-booking platform, built using **Node.js**, **Express**, **MongoDB**, and **JWT**. It supports rider and driver roles, real-time location updates, geospatial driver matching, and ride lifecycle management.

---

## 🔗 Live Demo & Repository

- **Live API:** [https://ridehub.onrender.com/](https://ridehub.onrender.com/)  
- **GitHub Repo:** [https://github.com/bhuvaneshwari-m-s/ridehub](https://github.com/bhuvaneshwari-m-s/ridehub)

---

## 🌟 Features

- ✅ **User Authentication** (JWT)
- ✅ **Role-Based Access Control** (`rider`, `driver`)
- ✅ **MongoDB 2dsphere Geolocation** for driver location
- ✅ **Ride Booking** with nearest driver matching (within 5 km)
- ✅ **Ride History API** for both rider & driver
- ✅ **Mark Ride as Completed**
- ✅ RESTful API with secure protected routes
- ✅ Deployment-ready with `.env` configuration

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT + Bcrypt  
- **Geo Queries:** MongoDB Geospatial (2dsphere)  
- **Deployment:** Render  
- **Testing:** Postman / Thunder Client

---

## 💡 Design Patterns Used

### 1. Singleton – Logger
- File: `patterns/singleton/logger.js`
- Ensures that one logging instance is reused across the entire app.

### 2. Factory – Vehicle Factory
- File: `patterns/factory/vehicleFactory.js`
- Dynamically creates vehicle types like `Car`, `Auto`, etc.  
- Useful for modular ride behavior (e.g., different rates or logs per vehicle).

### 3. Strategy – Fare Calculation
- Files: `patterns/strategy/pricingContext.js`, `normalPricing.js`
- Allows flexible fare logic that can change during peak hours, long distances, etc.

> All patterns are used in `rideController.js` to keep the business logic clean and testable.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhuvaneshwari-m-s/ridehub.git
cd ridehub
