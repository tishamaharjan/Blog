import { Router } from "express";
import {
  addCommentController,
  deleteCommentController,
  getCommentByIdController,
  updateCommentContoller,
} from "../controllers/comment.controller.js";

const router: Router = Router();

router.post("/add-comment", addCommentController);
router.get("/get-comment", getCommentByIdController);
router.post("/update-comment", updateCommentContoller);
router.post("/delete-comment", deleteCommentController);

export default router;
