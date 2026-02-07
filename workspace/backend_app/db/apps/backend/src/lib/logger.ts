import dotenv from "dotenv";
import winston from "winston";
import LokiTransport from "winston-loki";

dotenv.config();

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: "HH:mm:ss",
  }),
  winston.format.printf((info) => ` ${info.timestamp} [${info.level}] ${info.message}`),
);

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const logger = winston.createLogger({
  format: winston.format.json(),
  level: LOG_LEVEL,
  transports: [new winston.transports.Console({ format: alignColorsAndTime })],
});

logger.add(
  new LokiTransport({
    host: "https://loki.schuur.thebarngames.nl",
    format: winston.format.json(),
    basicAuth: "loki:lokipoes",
    json: true,
    labels: {
      service: "teamup-backend",
      environment: process.env.ENVIRONMENT,
    },
  }),
);

export default logger;
