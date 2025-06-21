// /patterns/factory/vehicleFactory.js
const Car = require('../../models/vehicles/car');
const Auto = require('../../models/vehicles/auto');
const Bike = require('../../models/vehicles/bike');

class VehicleFactory {
  static getVehicle(type) {
    switch (type) {
      case 'car': return new Car();
      case 'auto': return new Auto();
      case 'bike': return new Bike();
      default: throw new Error("Invalid vehicle type");
    }
  }
}
module.exports = VehicleFactory;
