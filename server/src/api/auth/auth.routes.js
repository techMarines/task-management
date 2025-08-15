import { Router } from "express";
import authMiddleware from "#middlewares/auth.middleware";
import * as authController from "#api/auth/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/get-email-verification-link/:userId", authMiddleware, authController.sendLinkForEmailVerification);
router.get("/verify-email/:token", authMiddleware, authController.verifyEmail);

export default router;
