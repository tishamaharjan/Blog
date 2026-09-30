import { Router } from "express";
import {
  addBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
} from "../controllers/blog.controller.js";
import { uploadBlogImage } from "../middleware/upload.middleware.js";

const router: Router = Router();

// "image" must match the field name the frontend uses in its FormData, e.g.:
//   const fd = new FormData();
//   fd.append("image", fileInput.files[0]);
//   fd.append("userId", "1");
//   fd.append("blogDetail", "...");
//   fd.append("uploadDate", new Date().toISOString());
//   fetch("/api/blogs", { method: "POST", body: fd });

// router.post("/blogs", uploadBlogImage.single("image"), addBlogController);
// router.get("/blogs/:blogId?", getBlogByIdController); // or use req.query as written above
// router.get("/blogs", getAllBlogsController);
// router.put("/blogs", uploadBlogImage.single("image"), updateBlogController);
// router.delete("/blogs", deleteBlogController);

router.post("/add-blog", uploadBlogImage.single("image"), addBlogController);
router.get("/get-blog", getBlogByIdController);
router.get("/get-all-blogs", getAllBlogsController);
router.put(
  "/update-blog",
  uploadBlogImage.single("image"),
  updateBlogController,
);
router.delete("/delete-blog", deleteBlogController);

export default router;
