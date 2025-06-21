// /patterns/singleton/logger.js
class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    Logger.instance = this;
  }

  log(message) {
    console.log(`[LOG] ${new Date().toISOString()} | ${message}`);
  }
}

module.exports = new Logger(); // Export the singleton instance
