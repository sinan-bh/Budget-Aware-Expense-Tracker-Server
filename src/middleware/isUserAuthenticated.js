import { UnauthorizedException } from "../utils/customExceptions.js";
import { createErrorLog } from "../utils/serviceLoggers.js";
import jwt from "jsonwebtoken";

// Define the authentication middleware function
export const isUserAuthenticated = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.accessToken;
    if (!token) {
      throw new UnauthorizedException("No token is provided");
    }

    if (!process.env?.ACCESS_TOKEN_SECRET) {
      throw new UnauthorizedException("JWT_SECRET is not provided");
    }

    const decryptedToken = jwt.verify(token, process.env?.ACCESS_TOKEN_SECRET);

    if (!decryptedToken) {
      throw new UnauthorizedException("Invalid token");
    }
    req.user = decryptedToken;

    if (decryptedToken) {
      next();
    } else {
      throw new UnauthorizedException("Unauthorized");
    }
  } catch (error) {
    createErrorLog(
      `[authorizer] [isUserAuthenticated] error: ${error.message}`,
      "isUserAuthenticatedMiddleware"
    );
    return next(new UnauthorizedException(error.message));
  }
};
