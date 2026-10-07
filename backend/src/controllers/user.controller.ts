import { z } from "zod";
import type { Request, Response } from "express";
import {
  changePasswordModel,
  createUserModel,
  deleteUserModel,
  getUserByIdModel,
  updateUserModel,
} from "../models/user.model.js";
import {
  changePassword,
  deleteUser,
  getUserById,
  registerUser,
  updateUser,
} from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthenticatedRequest } from "../middleware/authentication.js";
import { AppError } from "../utils/AppError.js";
import { uploadImageAndGetUrl } from "../services/imageUpload.service.js";

const CreateUserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  password: z.string().min(8),
});

const UpdateUserSchema = z.object({
  username: z.string().min(3).max(255),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const IdUserSchema = z.object({
  userId: z.number().int(),
});

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

function authenticatedUserId(req: AuthenticatedRequest): number {
  const userId = Number(req.user?.userId);

  if (!Number.isInteger(userId)) {
    throw new AppError("Not authenticated.", 401);
  }

  return userId;
}

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = CreateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required.",
      });
    }

    const profileImage = await uploadImageAndGetUrl(req.file.path);

    const user = createUserModel({
      ...parsed.data,
      profileImage,
    });

    const result = await registerUser(user);

    return res.status(201).json({
      message: "User registered successfully.",
      data: result,
    });
  },
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = IdUserSchema.safeParse({
      userId: Number(req.params.id),
    });

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = getUserByIdModel(parsed.data);
    const result = await getUserById(user);

    return res.status(200).json({
      message: "User details fetched successfully.",
      data: result,
    });
  },
);

export const getCurrentUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = authenticatedUserId(req);
    const result = await getUserById({ userId });

    return res.status(200).json({
      message: "Current user fetched successfully.",
      data: result,
    });
  },
);

export const updateUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = authenticatedUserId(req);

    const parsed = UpdateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    let profileImage: string | null | undefined;

    if (req.file) {
      profileImage = await uploadImageAndGetUrl(req.file.path);
    } else {
      const existing = await getUserById({ userId });
      profileImage = existing.profileImage ?? undefined;
    }

    const user = updateUserModel(
      {
        ...parsed.data,
        profileImage,
      },
      userId,
    );

    const result = await updateUser(user);

    return res.status(200).json({
      message: "User updated successfully.",
      data: result,
    });
  },
);

export const deleteUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = authenticatedUserId(req);
    const user = deleteUserModel(userId);
    await deleteUser(user);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  },
);

export const changePasswordController = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = authenticatedUserId(req);

    const parsed = ChangePasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = changePasswordModel(parsed.data, userId);
    const result = await changePassword(user);

    return res.status(200).json({
      message: "Password changed successfully.",
      data: result,
    });
  },
);
