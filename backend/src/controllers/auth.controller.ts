import { z } from "zod";
import type { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isProduction } from "../config/env.js";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // keep in sync with JWT_EXPIRES_IN

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    maxAge: COOKIE_MAX_AGE_MS,
  };
}

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = LoginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: parsed.error.flatten(),
      });
    }

    const { token, user } = await loginUser(parsed.data);
    res.cookie("token", token, authCookieOptions());

    return res.status(200).json({
      message: "Login successful.",
      data: user,
    });
  },
);

export function logoutUserController(_req: Request, res: Response): Response {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully." });
}
