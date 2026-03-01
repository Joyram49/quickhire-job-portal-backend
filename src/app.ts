import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { dbConnectMiddleware } from "./middleware/dbConnect";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { applicationsRouter } from "./routes/applications";
import { jobsRouter } from "./routes/jobs";
import { authRouter } from "./routes/auth";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Connect to database on first request (important for serverless)
app.use(dbConnectMiddleware);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/applications", applicationsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
