import express from "express";
import {
  getCategoriesController,
  addCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";
const router = express.Router();

router.get("/", isUserAuthenticated, makeCallback(getCategoriesController));
router.post("/", isUserAuthenticated, makeCallback(addCategoryController));
router.delete(
  "/:id",
  isUserAuthenticated,
  makeCallback(deleteCategoryController)
);

export default router;
