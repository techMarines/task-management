import { Router } from "express";
import userRoutes from "./users/user.routes.js";
import projectRoutes from "./projects/project.routes.js";
import authRoutes from "./auth/auth.routes.js";

const router = Router();

// mount the individual routers on the main api router
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

export default router;
