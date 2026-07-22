import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toggleLike } from "../models/like.model.js";
import { toggleLikeService } from "../services/like.service.js";

const ToggleLikeSchema = z.object({
  userId: z.number().int(),
  blogId: z.number().int(),
  commentId: z.number().int().optional(),
});

export const toggleLikeController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = ToggleLikeSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const like = toggleLike(parsed.data);

    const result = await toggleLikeService(like);

    return res.status(200).json({
      message: result.Liked
        ? "Liked successfully."
        : "Removed like successfully.",
      data: result,
    });
  },
);
