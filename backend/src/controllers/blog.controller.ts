import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import {
  createBlogModel,
  getBlogModel,
  updateBlogModel,
} from "../models/blog.model.js";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../services/blog.service.js";

const CreateBlogSchema = z.object({
  userId: z.number().int(),
  blogDetail: z.string(),
  blogImage: z.string(),
  uploadDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const getBlogByIdSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
});

const UpdateBlogSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
  blogDetail: z.string(),
  blogImage: z.string(),
  uploadDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
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

    const blog = createBlogModel(parsed.data);
    const result = await addBlog(blog);

    return res.status(201).json({
      message: "Blog added successfully.",
      data: result,
    });
  },
);

export const getBlogByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = getBlogByIdSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const blog = getBlogModel(parsed.data);
    const result = await getBlogById(blog);

    return res.status(200).json({
      message: "Blog fetched successfully.",
      data: result,
    });
  },
);

export const getAllBlogsController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllBlogs();

    return res.status(200).json({
      message: "Blogs fetched successfully.",
      data: result,
    });
  },
);

export const updateBlogContoller = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = UpdateBlogSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const blog = updateBlogModel(parsed.data);
    const result = await updateBlog(blog);

    return res.status(200).json({
      message: "Blog updated successfully.",
      data: result,
    });
  },
);

export const deleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = getBlogByIdSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const blog = getBlogModel(parsed.data);
    const result = await deleteBlog(blog);

    return res.status(200).json({
      message: "Blog deleted successfully.",
    });
  },
);
