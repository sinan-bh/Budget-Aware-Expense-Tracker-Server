import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js"; // Importing the logger
import { AsyncLocalStorage } from "node:async_hooks";
const asyncLocalStorage = new AsyncLocalStorage();

export const getCorrelationId = () => {
  const store = asyncLocalStorage.getStore();
  return store?.get("correlationId");
};

export const setContextValue = (key, value) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.set(key, value);
    return true;
  }
  return false;
};

export const getContextValue = (key) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    return store.get(key);
  } else {
    return null;
  }
};

export function initiateAsyncLocalStorage(req, res, next) {
  const store = new Map();
  asyncLocalStorage.run(store, () => {
    logger.info("AsyncLocalStorage initiated");
    next();
  });
}

export function correlationIdMiddleware(req, res, next) {
  const correlationId = Array.isArray(req.headers["x-correlation-id"])
    ? req.headers["x-correlation-id"][0]
    : req.headers["x-correlation-id"] || uuidv4();
  const store = asyncLocalStorage.getStore();
  store?.set("correlationId", correlationId);
  res.setHeader("X-Correlation-ID", correlationId);
  req.correlationId = correlationId;
  logger.info("Request received", { correlationId });
  res.on("finish", () => {
    logger.info("Response sent", {
      correlationId,
      ...(getContextValue("userId")
        ? { userId: getContextValue("userId") }
        : {}),
    });
  });
  next();
}
