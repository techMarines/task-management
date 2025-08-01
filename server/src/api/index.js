import { Router } from "express";
import userRoutes from "#api/users/user.routes";
import projectRoutes from "#api/projects/project.routes";
import authRoutes from "#api/auth/auth.routes";
import authMiddleware from "#middlewares/auth.middleware";

const router = Router();

// mount the individual routers on the main api router
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/projects", authMiddleware, projectRoutes);

export default router;
