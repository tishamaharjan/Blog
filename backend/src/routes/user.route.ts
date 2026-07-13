import express, { Router } from "express";
import {
  changePasswordController,
  deleteUserController,
  getUserByIdController,
  registerUserController,
  updateUserController,
} from "../controllers/user.controller.js";
import rateLimit from "express-rate-limit";

const router: Router = express.Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many registration attempts. Try again later." },
});

router.post("/register", registerLimiter, registerUserController);
router.get("/:id", getUserByIdController);
router.post("/update-user", updateUserController);
router.post("/delete-user", deleteUserController);
router.post("/change-password", changePasswordController);

export default router;
