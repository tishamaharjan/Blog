import { Router } from "express";
import {
  addBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  getBlogsByUserIdController,
  updateBlogController,
} from "../controllers/blog.controller.js";
import { uploadImage } from "../middleware/upload.middleware.js";

const router: Router = Router();

router.post("/add-blog", uploadImage.single("image"), addBlogController);
router.get("/get-blog", getBlogByIdController);
router.get("/get-all-blogs", getAllBlogsController);
router.get("/get-blogs/:userId", getBlogsByUserIdController);
router.put("/update-blog", uploadImage.single("image"), updateBlogController);
router.delete("/delete-blog", deleteBlogController);

export default router;
