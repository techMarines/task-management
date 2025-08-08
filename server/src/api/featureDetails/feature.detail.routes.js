import { Router } from "express";
import * as featureDetailsController from "#api/featureDetails/feature.detail.controller";

const router = Router();

router.patch("/:encodedFeatureId/updateDetails", featureDetailsController.updateFeatureDetails);

export default router;
