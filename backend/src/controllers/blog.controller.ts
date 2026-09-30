import { z } from "zod";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../services/blog.service.js";
import { uploadImageAndGetUrl } from "../services/imageUpload.service.js";

// Note: userId should ideally come from an auth middleware (req.user.id)
// rather than the request body, so a caller can't act as another user.

const CreateBlogSchema = z.object({
  userId: z.coerce.number().int(),
  blogDetail: z.string().min(1),
  uploadDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const IdParamsSchema = z.object({
  userId: z.coerce.number().int(),
  blogId: z.coerce.number().int(),
});

const UpdateBlogSchema = CreateBlogSchema.extend({
  blogId: z.coerce.number().int(),
});

export const addBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = CreateBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    if (!req.file) {
      throw new AppError("Blog image is required.", 400);
    }

    // Convert the uploaded file into a permanent URL before touching the DB
    const blogImage = await uploadImageAndGetUrl(req.file.path);

    const result = await addBlog({ ...parsed.data, blogImage });

    return res.status(201).json({
      message: "Blog added successfully.",
      data: result,
    });
  },
);

export const getBlogByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    // GET requests should read from params/query, not body
    const parsed = IdParamsSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const result = await getBlogById(parsed.data);

    return res.status(200).json({
      message: "Blog fetched successfully.",
      data: result,
    });
  },
);

export const getAllBlogsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllBlogs();

    return res.status(200).json({
      message: "Blogs fetched successfully.",
      data: result,
    });
  },
);

export const updateBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = UpdateBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    // Image is optional on update — only re-upload if a new file was sent,
    // otherwise keep whatever URL was already saved (client should send it back).
    let blogImage = req.body.existingBlogImage as string | undefined;
    if (req.file) {
      blogImage = await uploadImageAndGetUrl(req.file.path);
    }
    if (!blogImage) {
      throw new AppError("Blog image is required.", 400);
    }

    const result = await updateBlog({ ...parsed.data, blogImage });

    return res.status(200).json({
      message: "Blog updated successfully.",
      data: result,
    });
  },
);

export const deleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = IdParamsSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    await deleteBlog(parsed.data);

    return res.status(200).json({
      message: "Blog deleted successfully.",
    });
  },
);
