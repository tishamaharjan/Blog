import type { NextFunction, Request, Response } from "express";
import { verifyToken, type TokenPayload } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void {
  const token = req.cookies?.token as string | undefined;

  if (!token) {
    return next(new AppError("Not authenticated.", 401));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (e) {
    next(e);
  }
}
