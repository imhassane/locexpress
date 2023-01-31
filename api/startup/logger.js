const winston = require('winston');

const LOG_LEVELS = {
    "error": 0,
    "warn": 1,
    "info": 2,
    "http": 3,
    "verbose": 4,
    "debug": 5,
    "silly": 6
};

const logger = winston.createLogger({
    levels: LOG_LEVELS,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/access.log" })
    ],
    exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
    rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
});

module.exports = {
    logger,
    LOG_LEVELS
};