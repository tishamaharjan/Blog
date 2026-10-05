import express, { Router } from "express";
import {
  changePasswordController,
  deleteUserController,
  getCurrentUserController,
  getUserByIdController,
  registerUserController,
  updateUserController,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/authentication.js";
import rateLimit from "express-rate-limit";

const router: Router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many registration attempts. Try again later." },
});

router.post("/register", registerLimiter, registerUserController);
router.get("/me", requireAuth, getCurrentUserController);
router.get("/:id", requireAuth, getUserByIdController);
router.post("/update-user", requireAuth, updateUserController);
router.post("/delete-user", requireAuth, deleteUserController);
router.post("/change-password", requireAuth, changePasswordController);

export default router;
