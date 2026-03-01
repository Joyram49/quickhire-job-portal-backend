import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createJob,
  deleteJob,
  getJobById,
  listJobs,
} from "../controllers/jobs.controller";
import { requireAuth } from "../middleware/requireAuth";

export const jobsRouter = Router();

// Public
jobsRouter.get("/", asyncHandler(listJobs));
jobsRouter.get("/:id", asyncHandler(getJobById));

// Admin-only (authenticated)
jobsRouter.post("/", requireAuth, asyncHandler(createJob));
jobsRouter.delete("/:id", requireAuth, asyncHandler(deleteJob));
