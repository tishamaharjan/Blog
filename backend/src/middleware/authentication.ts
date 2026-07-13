import type { Request, Response, NextFunction } from "express";
import { verifyToken, type TokenPayload } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void | Response {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Not authenticated.", 401));
  }

  try {
    req.user = verifyToken(token) as TokenPayload;
    next();
  } catch (e) {
    next(e);
  }
}
