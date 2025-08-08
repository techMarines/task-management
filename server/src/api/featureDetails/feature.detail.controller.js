import sqids from "#config/sqids";
import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import * as featureDetailServices from "#services/feature.details.services";
import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";
import { FeatureStatus } from "@prisma/client";
import { FeaturePriority } from "@prisma/client";

export async function updateFeatureDetails(req, res) {
    const { encodedFeatureId } = req.params;
    const updateData = req.body;

    if (updateData.status && !(updateData.status in FeatureStatus)) {
        throw new ApiError(HTTP_RESPONSE_CODE.BAD_REQUEST, "Invalid feature status are the only valid statuses available", {
            validStatuses: Object.keys(FeatureStatus),
        });
    }
    if (updateData.priority && !(updateData.priority in FeaturePriority)) {
        throw new ApiError(HTTP_RESPONSE_CODE.BAD_REQUEST, "Invalid feature status are the only valid priorities available", {
            validPriorities: Object.keys(FeaturePriority),
        });
    }

    const [featureId] = sqids.decode(encodedFeatureId);

    await featureDetailServices.updateFeatureDetails(featureId, updateData);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json(new ApiResponse(HTTP_RESPONSE_CODE.SUCCESS));
}
