import type { Request, Response } from "express";
import { Types } from "mongoose";
import { HttpError } from "../utils/httpError";
import { Job } from "../models/job.model";
import { createJobSchema, listJobsQuerySchema } from "../validation/jobSchemas";

export async function listJobs(req: Request, res: Response) {
  const { search, category, location } = listJobsQuerySchema.parse(req.query);

  const filter: Record<string, unknown> = {};

  if (category) {
    filter.category = category;
  }

  if (location) {
    filter.location = location;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ title: regex }, { company: regex }, { description: regex }];
  }

  const jobs = await Job.find(filter).sort({ created_at: -1 }).lean();
  res.json({ success: true, data: jobs });
}

export async function getJobById(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid job id");
  }

  const job = await Job.findById(id).lean();
  if (!job) {
    throw new HttpError(404, "Job not found");
  }

  res.json({ success: true, data: job });
}

export async function createJob(req: Request, res: Response) {
  const payload = createJobSchema.parse(req.body);

  const job = await Job.create(payload);

  res.status(201).json({ success: true, data: job });
}

export async function deleteJob(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid job id");
  }

  const deleted = await Job.findByIdAndDelete(id);
  if (!deleted) {
    throw new HttpError(404, "Job not found");
  }

  res.status(204).send();
}
