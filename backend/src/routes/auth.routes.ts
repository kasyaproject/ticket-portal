import express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/checkMe", authMiddleware, authController.checkMe);
router.post("/activation", authController.activation);

export default router;
