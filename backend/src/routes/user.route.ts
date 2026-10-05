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
import { uploadImage } from "../middleware/upload.middleware.js";
import rateLimit from "express-rate-limit";

const router: Router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many registration attempts. Try again later." },
});

// Field name must match the key used in the frontend FormData.
router.post(
  "/register",
  registerLimiter,
  uploadImage.single("profileImage"),
  registerUserController,
);
router.get("/me", requireAuth, getCurrentUserController);
router.get("/:id", requireAuth, getUserByIdController);
router.post("/update-user", requireAuth, updateUserController);
router.post("/delete-user", requireAuth, deleteUserController);
router.post("/change-password", requireAuth, changePasswordController);

export default router;
