import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import {
  createCommentModel,
  getCommentByIdModel,
  updateCommentModel,
} from "../models/comment.model.js";
import {
  addComment,
  deleteComment,
  getCommentById,
  updateComment,
} from "../services/comment.service.js";

const CreateCommentSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
  comment: z.string(),
});

const getCommentByIdSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
  commentId: z.number().int(),
});

const UpdateCommentSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
  commentId: z.number().int(),
  comment: z.string(),
});

export const addCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = CreateCommentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const comment = createCommentModel(parsed.data);
    const result = await addComment(comment);

    return res.status(201).json({
      message: "Comment added successfully.",
      data: result,
    });
  },
);

export const getCommentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = getCommentByIdSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const comment = getCommentByIdModel(parsed.data);
    const result = await getCommentById(comment);

    return res.status(200).json({
      message: "Comment fetched successfully.",
      data: result,
    });
  },
);

export const updateCommentContoller = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = UpdateCommentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const comment = updateCommentModel(parsed.data);
    const result = await updateComment(comment);

    return res.status(200).json({
      message: "Comment updated successfully.",
      data: result,
    });
  },
);

export const deleteCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = getCommentByIdSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const comment = getCommentByIdModel(parsed.data);
    const result = await deleteComment(comment);

    return res.status(200).json({
      message: "Comment deleted successfully.",
    });
  },
);
