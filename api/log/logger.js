const winston = require("winston");

var getLabel = function (callingModule) {
  var parts = callingModule.filename.split("/");
  return parts[parts.length - 2] + "/" + parts.pop();
};
// Define the logger configuration
exports.logger = winston.createLogger({
  level: "info", // Logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((info) => {
      return `[${info.level}] ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({
      filename: "./log/err.log",
      level: "error",
      format: winston.format.simple(),
    }), // Log to a file
  ],
});
