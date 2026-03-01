import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "ValidationError",
      details: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
      details: err.details,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({
    success: false,
    error: "InternalServerError",
  });
}
