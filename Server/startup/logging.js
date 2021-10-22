const winston = require("winston");
const { createLogger, transports } = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

const db = config.get("db");

const logger = createLogger({
  transports: [
    new winston.transports.File({
      filename: "./logs/logInfos.log",
      level: "info",
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
      format: winston.format.json(),
    }),
    new transports.Console({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.MongoDB({
      db: db,
      collection: "log",
      level: "info",
      storeHost: true,
      capped: true,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "./logs/exceptions.log" }),
    new transports.Console({
      level: "error",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "./logs/rejections.log" }),
  ],
  exitOnError: false,
  handleRejections: true,
});

module.exports = logger;
