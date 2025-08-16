import { Router } from "express";
import * as projectController from "#api/projects/project.controller";

const router = Router();

router.post("/create", projectController.createProject);
router.get("/user/me", projectController.getUserProjects);

export default router;
