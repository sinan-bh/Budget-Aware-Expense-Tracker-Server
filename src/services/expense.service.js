import Expense from "../model/expenseShema.js";
import Budget from "../model/budgetSchema.js";

export const addExpenseServices = async (userId, expenseData) => {
  const { categoryId, amount, date } = expenseData;

  const exp = await Expense.create({
    userId: userId,
    categoryId,
    amount,
    date,
  });

  const month = date.slice(0, 7); // "2025-06"

  const budgets = await Budget.findOne({
    userId: userId,
    categoryId,
    month,
  });

  const expenses = await Expense.aggregate([
    {
      $match: {
        userId: userId,
        categoryId: exp.categoryId,
        date: {
          $gte: new Date(month + "-01"),
          $lte: new Date(month + "-31"),
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const spent = expenses[0]?.total || 0;

  const isOver = budgets ? spent > budgets.limit : false;
  return {
    message: "Expense added successfully",
    data: {
      expense: exp,
      status: isOver ? "over-budget" : "within-budget",
      spent,
      limit: budgets?.limit || 0,
    },
  };
};
