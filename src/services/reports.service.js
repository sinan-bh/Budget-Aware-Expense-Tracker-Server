import Expense from "../model/expenseShema.js";
import Budget from "../model/budgetSchema.js";
import Category from "../model/categorySchema.js";

export const monthlyReportServices = async (userId, month) => {
  const categories = await Category.find({ userId: userId });

  let report = [];

  for (let cat of categories) {
    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          categoryId: cat._id,
          date: {
            $gte: new Date(month + "-01"),
            $lte: new Date(month + "-31"),
          },
        },
      },
      { $group: { _id: null, spent: { $sum: "$amount" } } },
    ]);

    const budget = await Budget.findOne({
      userId: userId,
      categoryId: cat._id,
      month,
    });

    const spent = expenses[0]?.spent || 0;
    const limit = budget?.limit || 0;

    report.push({
      category: cat.name,
      color: cat.color,
      spent,
      limit,
      remaining: limit - spent,
    });
  }

  return {
    message: "Monthly report generated successfully",
    data: { report: report },
  };
};
