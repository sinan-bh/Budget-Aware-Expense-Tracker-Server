import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import makeCallback from "../../config/makeCallback.js";

const router = express.Router();

router.post("/signup", makeCallback(signup));
router.post("/login", makeCallback(login));

export default router;
