import Expense from "../model/expenseShema.js";
import Budget from "../model/budgetSchema.js";
import Category from "../model/categorySchema.js";

export const monthlyReportServices = async (userId, month) => {
  const categories = await Category.find({ userId: userId });

  let report = [];

  for (let cat of categories) {    
    // Find the single expense document for the category and month
    const expense = await Expense.findOne({
      userId: userId,
      categoryId: cat._id,
      month: month,
    });

    const budget = await Budget.findOne({
      userId: userId,
      categoryId: cat._id,
      month: month,
    });

    const spent = expense?.amount || 0;
    let limit = budget?.limit || 0; // Prefer limit from expense document

    // If no expense document, try to get budget limit from Budget model
    if (!expense) {
      const budget = await Budget.findOne({
        userId: userId,
        categoryId: cat._id,
        month,
      });
      limit = budget?.limit || 0;
    }

    const progress = limit > 0 ? (spent / limit) * 100 : 0;

    report.push({
      category: cat.name,
      color: cat.color,
      spent,
      limit,
      remaining: limit - spent,
      progress: Math.min(progress, 100),
    });
  }

  return {
    message: "Monthly report generated successfully",
    data: { report: report },
  };
};
