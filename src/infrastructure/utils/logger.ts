import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json() // Logs will be in JSON format
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: "logs/transactions.log" }), // Logs to a file
  ],
});

export default logger;
