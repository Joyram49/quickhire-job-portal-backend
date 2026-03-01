import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Email must be valid"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z.string().min(1, "Password is required"),
});
