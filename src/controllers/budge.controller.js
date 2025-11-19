import {
  deleteBudgetServices,
  getBudgetsServices,
  upsertBudgetServices,
} from "../services/budget.service.js";

export const getBudgetsController = async (req) => {
  try {
    const { month } = req.query;
    return await getBudgetsServices(req.user.id, month);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const upsertBudgetController = async (req) => {
  try {
    const { month, categoryId, limit } = req.body;
    return await upsertBudgetServices(req.user.id, month, categoryId, limit);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const deleteBudgetController = async (req) => {
  try {
    return await deleteBudgetServices(req.user.id, req.params.id);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};
