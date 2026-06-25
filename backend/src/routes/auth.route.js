import express from "express";
import { loginUserController } from "../controllers/auth.controller.js";
import { logoutUserController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export default router;
// router.get("/profile", requireAuth, getProfileController);
