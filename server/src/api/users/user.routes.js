import { Router } from "express";
import * as userController from "#api/users/user.controller";

const router = Router();

router.patch("/changeUserDisplayName", userController.updateUserDisplayName);

export default router;
