import express from "express";
import { addExpenseController, getExpenseController } from "../controllers/expense.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = express.Router();

router.get("/", isUserAuthenticated, makeCallback(getExpenseController));
router.post("/", isUserAuthenticated, makeCallback(addExpenseController));

export default router;
