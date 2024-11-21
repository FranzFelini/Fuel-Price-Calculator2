const winston = require("winston");

const logger2 = winston.createLogger({
  level: "info", // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamp
    winston.format.colorize(), // This will add colors to the log level
    winston.format.printf(({ timestamp, level, message }) => {
      // Customize the message color (yellow in this case)
      return `${timestamp} [${level}] - \x1b[33m${message}\x1b[0m`; // \x1b[33m sets yellow, \x1b[0m resets color
    })
  ),
  transports: [
    new winston.transports.Console(), // Apply color to console logs
  ],
});

module.exports = logger2;
