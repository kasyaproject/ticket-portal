import express, { Request, Response } from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/checkMe", authMiddleware, authController.checkMe);
router.post("/auth/activation", authController.activation);

export default router;
