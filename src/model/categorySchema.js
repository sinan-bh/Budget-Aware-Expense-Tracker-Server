import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  color: String
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
