import { Router } from "express";
import * as userController from "#api/users/user.controller";

const router = Router();

router.patch("/changeUserDisplayName", userController.updateUserDisplayName);
router.get("/:userId", userController.getUserById);
router.patch("/:userId/updateUserActiveProject", userController.updateUserActiveProject);

export default router;
