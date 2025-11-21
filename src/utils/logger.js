import { createLogger, format, transports } from "winston";

const { combine, timestamp } = format;

const errorFilter = format((info) => {
  return info.level === "error" ? info : false;
});

const infoFilter = format((info) => {
  return info.level === "info" ? info : false;
});

const logger = createLogger({
  level: "debug",
  exitOnError: false,
  defaultMeta: {
    service: process.env.APPLICATION_NAME || "application-name",
  },
  format: combine(
    // format.errors({ stack: true }),
    timestamp({ format: "MM-DD-YYYY HH:mm:ss" })
  ),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(errorFilter(), format.json()),
    }),
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: combine(infoFilter(), format.json()),
    }),
  ],
});

export { logger };
