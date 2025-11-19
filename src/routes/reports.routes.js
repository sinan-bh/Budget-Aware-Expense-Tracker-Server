import express from "express";
import { monthlyReportController } from "../controllers/reports.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = express.Router();

router.get("/", isUserAuthenticated, makeCallback(monthlyReportController));

export default router;
