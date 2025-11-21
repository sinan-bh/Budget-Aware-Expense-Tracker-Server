import Expense from "../model/expenseShema.js";
import Budget from "../model/budgetSchema.js";

export const getExpenseServices = async (userId, month) => {
  const expenses = await Expense.find({ userId: userId, month }).populate(
    "categoryId",
    "name color"
  );
  
  return {
    message: "Expenses fetched successfully",
    data: expenses,
  };
};

export const addExpenseServices = async (
  userId,
  { categoryId, amount, month }
) => {
  const exp = await Expense.create({
    userId: userId,
    categoryId,
    amount,
    month : month.slice(0, 7),
  });


  const budgets = await Budget.findOne({
    userId: userId,
    categoryId,
    month: month.slice(0, 7),
  });

  const expenses = await Expense.aggregate([
    {
      $match: {
        userId: userId,
        categoryId: exp.categoryId,
        month: month.slice(0, 7),
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
