import mongoose from "mongoose";
import { env } from "../config/env";

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.DATABASE_URL, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    isConnected = false;
    throw error;
  }
}

export async function disconnectDb() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

