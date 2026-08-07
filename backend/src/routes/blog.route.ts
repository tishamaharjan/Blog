import { Router } from "express";
import {
  addBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogContoller,
} from "../controllers/blog.controller.js";

const router: Router = Router();

router.post("/add-blog", addBlogController);
router.get("/get-blog", getBlogByIdController);
router.get("/get-all-blogs", getAllBlogsController);
router.post("/update-blog", updateBlogContoller);
router.post("/delete-blog", deleteBlogController);

export default router;
