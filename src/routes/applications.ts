import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createApplication } from "../controllers/application.controller";

export const applicationsRouter = Router();

applicationsRouter.post("/", asyncHandler(createApplication));

