# 🚗 RideHub - Uber-like Ride Booking Backend

RideHub is a fully functional backend system for a ride-booking platform, built using **Node.js**, **Express**, **MongoDB**, and **JWT**. It supports rider and driver roles, real-time location updates, geospatial driver matching, and ride lifecycle management.

> 🔥 Designed as a resume-ready project to demonstrate backend architecture and system thinking, ideal for companies like Uber, Swiggy, or Ola.

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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhuvaneshwari-m-s/ridehub.git
cd ridehub
