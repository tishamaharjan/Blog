import express, { Router } from "express";
import { loginUserController } from "../controllers/auth.controller.js";
import { logoutUserController } from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";

const router: Router = express.Router();

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { message: "Too many login attempts. Try again later." },
// });

router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export default router;
