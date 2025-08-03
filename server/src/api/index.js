import { Router } from "express";
import authMiddleware from "#middlewares/auth.middleware";
import authRoutes from "#api/auth/auth.routes";
import userRoutes from "#api/users/user.routes";
import projectRoutes from "#api/projects/project.routes";
import projectRoleRoutes from "#api/projectRoles/project.role.routes";

const router = Router();

// mount the individual routers on the main api router
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/projects", authMiddleware, projectRoutes);
router.use("/projectRoles", authMiddleware, projectRoleRoutes);

export default router;
