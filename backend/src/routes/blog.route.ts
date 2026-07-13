import { Router } from "express";
import {
  addBlogController,
  deleteBlogController,
  getBlogByIdController,
  updateBlogContoller,
} from "../controllers/blog.controller.js";

const router: Router = Router();

router.post("/add-blog", addBlogController);
router.get("/get-blog", getBlogByIdController);
router.post("/update-blog", updateBlogContoller);
router.post("/delete-blog", deleteBlogController);

export default router;
