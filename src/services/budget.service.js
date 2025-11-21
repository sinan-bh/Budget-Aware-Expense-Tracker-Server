import Budget from "../model/budgetSchema.js";

export const getBudgetsServices = async (userId, month) => {
  const budgets = await Budget.find({ userId: userId, month: month })
    .sort({ createdAt: -1 })
    .populate("categoryId", "name color");

  return {
    message: "Budgets fetched successfully",
    data: { budgets: budgets },
  };
};

export const upsertBudgetServices = async (
  userId,
  month,
  categoryId,
  limit
) => {

  const budget = await Budget.findOneAndUpdate(
    { userId: userId, categoryId: categoryId, month: month },
    { limit: limit }
  );

  //set month 2025-06
  month = month.toString().padStart(2, "0");

  if (!budget) {
    const newBudget = await Budget.create({
      userId: userId,
      month: month,
      categoryId: categoryId,
      limit: limit,
    });
    return {
      message: "Budget created successfully",
      data: { budget: newBudget },
    };
  }
  return { message: "Budget updated successfully", data: { budget: budget } };
};

export const deleteBudgetServices = async (userId, budgetId) => {
  await Budget.deleteOne({ _id: budgetId, userId: userId });
  return { message: "Budget deleted successfully" };
};
