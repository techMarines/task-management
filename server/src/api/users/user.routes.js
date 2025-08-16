import { Router } from "express";
import * as userController from "#api/users/user.controller";

const router = Router();

router.patch("/me/changeUserDisplayName", userController.updateUserDisplayName);
router.get("/me", userController.getUserDetails);
router.patch("/me/updateUserActiveProject", userController.updateUserActiveProject);

export default router;
