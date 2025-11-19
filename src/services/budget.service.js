import Budget from "../model/budgetSchema.js";

export const getBudgetsServices = async (userId, month) => {
    
  const budgets = await Budget.find({ userId: userId, month: month });
  return {
    message: "Budgets fetched successfully",
    data: { budgets: budgets },
  };
};

export const upsertBudgetServices = async (userId, month, categoryId, limit) => {
  const budget = await Budget.findOneAndUpdate(
    { userId: userId, month: month, categoryId: categoryId },
    { limit: limit },
    { new: true, upsert: true }
  );
  return { message: "Budget upserted successfully", data: { budget: budget } };
};

export const deleteBudgetServices = async (userId, budgetId) => {
  await Budget.deleteOne({ _id: budgetId, userId: userId });
  return { message: "Budget deleted successfully" };
};
