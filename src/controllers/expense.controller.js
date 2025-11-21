import customError from "../../config/customError.js";
import { addExpenseServices, getExpenseServices } from "../services/expense.service.js";

export const getExpenseController = async (req) => {
  try {
    return await getExpenseServices(req.user.id, req.query.month);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const addExpenseController = async (req) => {
  try {
    return await addExpenseServices(req.user.id, req.body);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};
