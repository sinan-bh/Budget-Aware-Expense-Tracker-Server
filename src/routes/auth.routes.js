import express from "express";
import { login, signup, createAccessToken } from "../controllers/auth.controller.js";
import makeCallback from "../../config/makeCallback.js";

const router = express.Router();

router.post("/signup", makeCallback(signup));
router.post("/login", makeCallback(login));
router.get("/token", makeCallback(createAccessToken));

export default router;
