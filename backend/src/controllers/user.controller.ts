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

const CreateUserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  password: z.string().min(8),
  profileImage: z.string(),
});

const UpdateUserSchema = z.object({
  userId: z.number().int(),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  profileImage: z.string().optional(),
});

const IdUserSchema = z.object({
  userId: z.number().int(),
});

const ChangePasswordSchema = z.object({
  userId: z.number().int(),
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = CreateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = createUserModel(parsed.data);
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

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = UpdateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = updateUserModel(parsed.data);
    const result = await updateUser(user);

    return res.status(200).json({
      message: "User updated successfully.",
      data: result,
    });
  },
);

export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = IdUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = deleteUserModel(parsed.data);
    await deleteUser(user);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  },
);

export const changePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = ChangePasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const user = changePasswordModel(parsed.data);
    const result = await changePassword(user);

    return res.status(200).json({
      message: "Password changed successfully.",
      data: result,
    });
  },
);
