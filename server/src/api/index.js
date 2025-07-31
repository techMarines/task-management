import { Router } from "express";
import userRoutes from "./users/user.routes.js";
import projectRoutes from "./projects/project.routes.js";
import authRoutes from "./auth/auth.routes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// mount the individual routers on the main api router
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/projects", authMiddleware, projectRoutes);

export default router;
