// /patterns/strategy/pricingContext.js
class PricingContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  getFare(distance) {
    return this.strategy.calculate(distance);
  }
}
module.exports = PricingContext;
