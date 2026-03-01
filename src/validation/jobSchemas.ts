import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

export const listJobsQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

