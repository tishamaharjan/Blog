import { Router } from "express";
import { toggleLikeController } from "../controllers/like.controller.js";

const router: Router = Router();

router.post("/toggle-like", toggleLikeController);

export default router;
