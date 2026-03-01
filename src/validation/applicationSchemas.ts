import { z } from "zod";

export const createApplicationSchema = z.object({
  job_id: z.string().min(1, "job_id is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  resume_link: z.string().url("Resume link must be a valid URL"),
  cover_note: z.string().min(1, "Cover note is required"),
});

