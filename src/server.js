import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";
import { logger } from "./utils/logger.js";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import budgetsRoutes from "./routes/budget.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    correlationId: req.correlationId || "",
  });
  next();
});

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res) => {
  res.json({ message: "Express server is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/budgets", budgetsRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/reports", reportsRoutes);

connectDB();

app.listen(process.env.PORT, () =>
  logger.info(`Server running on port ${process.env.PORT}`)
);
