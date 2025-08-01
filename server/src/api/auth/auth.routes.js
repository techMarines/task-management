import { Router } from "express";
import * as authController from "#api/auth/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
