import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password_hash: { type: String, required: true },
    // Future-proof: allow roles, but for now we treat any user as admin.
    role: {
      type: String,
      required: true,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: string;
};

export const User = model<UserDocument>("User", userSchema);

