import { Router } from "express";
import * as projectController from "#api/projects/project.controller";

const router = Router();

router.post("/create", projectController.createProject);

export default router;
