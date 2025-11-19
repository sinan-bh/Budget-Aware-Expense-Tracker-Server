import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  month: String, // e.g: "2025-06"
  limit: Number
});

export default mongoose.model("Budget", budgetSchema);
