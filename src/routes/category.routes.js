import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import makeCallback from "../../config/makeCallback.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";
const router = express.Router();

router.get("/", isUserAuthenticated, makeCallback(getCategories));
router.post("/", isUserAuthenticated, makeCallback(addCategory));
router.delete("/:id", isUserAuthenticated, makeCallback(deleteCategory));

export default router;
