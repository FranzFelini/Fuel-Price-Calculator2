const winston = require("winston");

const logger2 = winston.createLogger({
  level: "info", 
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
     
      return `${timestamp} [${level}] - \x1b[33m${message}\x1b[0m`; 
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger2;
