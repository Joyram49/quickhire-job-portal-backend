import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

function loadDotenv() {
  // Load from project .env first, then fall back to parent and src/.env
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
  dotenv.config({ path: path.resolve(process.cwd(), "src/.env") });
}

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine(
      (v) => v.startsWith("mongodb://") || v.startsWith("mongodb+srv://"),
      "DATABASE_URL must be a MongoDB connection string",
    ),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("1h"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  AUTH_SECRET: process.env.AUTH_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
});
