import express from "express";
import { addExpenseController } from "../controllers/expense.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = express.Router();

router.post("/", isUserAuthenticated, makeCallback(addExpenseController));

export default router;
