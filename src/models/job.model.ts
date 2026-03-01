import { Schema, model, type InferSchemaType } from "mongoose";

const jobSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export type JobDocument = InferSchemaType<typeof jobSchema> & {
  _id: string;
};

export const Job = model<JobDocument>("Job", jobSchema);

