import type { Request, Response, NextFunction } from "express";
import { connectDb } from "../db/connect";

let dbConnectPromise: Promise<void> | null = null;

export async function dbConnectMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    // Only initialize connection once
    if (!dbConnectPromise) {
      dbConnectPromise = connectDb();
    }
    await dbConnectPromise;
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    next(error);
  }
}
