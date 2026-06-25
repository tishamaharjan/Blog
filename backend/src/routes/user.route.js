import express from "express";
import { registerUserController } from "../controllers/user.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// const registerLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 5, // 5 attempts per IP per window
//   message: { error: "Too many registration attempts. Try again later." },
// });

router.post("/register", registerUserController);

export default router;
