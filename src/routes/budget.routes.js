import express from "express";
import {
  getBudgetsController,
  upsertBudgetController,
  deleteBudgetController,
} from "../controllers/budge.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = express.Router();

router.get("/", isUserAuthenticated, makeCallback(getBudgetsController));
router.post("/", isUserAuthenticated, makeCallback(upsertBudgetController));
router.delete(
  "/:id",
  isUserAuthenticated,
  makeCallback(deleteBudgetController)
);

export default router;
