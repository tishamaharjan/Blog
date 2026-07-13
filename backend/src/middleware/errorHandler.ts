import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { isProduction } from "../config/env.js";

export function notFoundHandler(req: Request, res: Response): void {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const isKnownError = err instanceof AppError;
  const status = isKnownError ? err.status : 500;
  const message = isKnownError ? err.message : "Internal server error";

  console.error(err); // always log full detail server-side

  res.status(status).json({
    message,
    ...(!isKnownError && !isProduction ? { stack: err.stack } : {}),
  });
}
