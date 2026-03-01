import type { Request, Response } from "express";
import { Types } from "mongoose";
import { Application } from "../models/application.model";
import { Job } from "../models/job.model";
import { HttpError } from "../utils/httpError";
import { createApplicationSchema } from "../validation/applicationSchemas";

export async function createApplication(req: Request, res: Response) {
  const payload = createApplicationSchema.parse(req.body);

  if (!Types.ObjectId.isValid(payload.job_id)) {
    throw new HttpError(400, "Invalid job_id");
  }

  const job = await Job.findById(payload.job_id);
  if (!job) {
    throw new HttpError(400, "Job does not exist");
  }

  const application = await Application.create(payload);

  res.status(201).json({ success: true, data: application });
}

