import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { login, logout, signup } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/requireAuth";

export const authRouter = Router();

// Admin signup (for this task we treat all users as admin)
authRouter.post("/signup", asyncHandler(signup));
authRouter.post("/login", asyncHandler(login));
authRouter.post("/logout", requireAuth, asyncHandler(logout));
