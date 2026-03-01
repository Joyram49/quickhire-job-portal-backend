import type { Request, Response } from "express";
import type { CookieOptions } from "express";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/user.model";
import { HttpError } from "../utils/httpError";
import { loginSchema, signupSchema } from "../validation/authSchemas";

const COOKIE_NAME = "access_token";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function signup(req: Request, res: Response) {
  const payload = signupSchema.parse(req.body);

  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new HttpError(409, "User with this email already exists");
  }

  const password_hash = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password_hash,
    role: "admin",
  });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    throw new HttpError(401, "Invalid email or password");
  }

  const tokenPayload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const signOptions: SignOptions = {
    expiresIn: "1h",
  };

  const token = jwt.sign(tokenPayload, env.AUTH_SECRET, signOptions);

  const cookieOptions: CookieOptions = {
    ...baseCookieOptions,
    // optional: 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie(COOKIE_NAME, token, cookieOptions).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

export async function logout(_req: Request, res: Response) {
  res
    .clearCookie(COOKIE_NAME, {
      ...baseCookieOptions,
      maxAge: 0,
    })
    .json({ success: true });
}
