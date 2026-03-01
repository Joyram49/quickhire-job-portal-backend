import {
  Schema,
  model,
  type InferSchemaType,
  Types,
} from "mongoose";

const applicationSchema = new Schema(
  {
    job_id: {
      type: Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    resume_link: { type: String, required: true, trim: true },
    cover_note: { type: String, required: true, trim: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export type ApplicationDocument = InferSchemaType<typeof applicationSchema> & {
  _id: string;
};

export const Application = model<ApplicationDocument>(
  "Application",
  applicationSchema,
);

