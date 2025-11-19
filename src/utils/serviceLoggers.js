// NOTE - These will not work if called before correlationMiddleware

import {
  getContextValue,
  getCorrelationId,
} from "../../config/correlationMiddleware.js";
import { logger } from "./logger.js";

export const createErrorLog = (message, service) =>
  logger.error({
    correlationId: getCorrelationId(),
    service,
    message,
    ...(getContextValue("userId") ? { userId: getContextValue("userId") } : {}),
  });

export const createInfoLog = (message, service) =>
  logger.info({
    correlationId: getCorrelationId(),
    service,
    message,
    ...(getContextValue("userId") ? { userId: getContextValue("userId") } : {}),
  });
