import customError from "../../config/customError.js";
import { loginService, signupService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    return await signupService(req.body);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const login = async (req) => {    
  try {
    return await loginService(req.body);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};
