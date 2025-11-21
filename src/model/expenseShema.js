import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    amount: Number,
    month: String, //e.g: "2025-06"
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
