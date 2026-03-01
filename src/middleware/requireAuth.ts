import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "../utils/httpError";

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;

  if (!token) {
    throw new HttpError(401, "Not authenticated");
  }

  try {
    const payload = jwt.verify(token, env.AUTH_SECRET) as AuthPayload;
    req.user = payload;
    next();
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}
