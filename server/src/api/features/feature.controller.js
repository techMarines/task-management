import sqids from "#config/sqids";
import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";
import * as featureServices from "#services/feature.services";

export async function createFeature(req, res) {
    const { featureName, encodedCategoryId, encodedFeatureParentId } = req.body;

    if (!featureName || !encodedCategoryId) throw new ApiError(HTTP_RESPONSE_CODE.BAD_REQUEST, "Required fields for feature creation not provided");

    const [categoryId] = sqids.decode(encodedCategoryId);
    const [featureParentId] = encodedFeatureParentId ? sqids.decode(encodedFeatureParentId) : [null];

    const alreadyExists = await featureServices.checkFeatureExistsForCategory(featureName, categoryId);
    if (alreadyExists) throw new ApiError(HTTP_RESPONSE_CODE.CONFLICT, "Feature with this name already exists in the given category");

    const feature = await featureServices.createFeature(featureName, categoryId, featureParentId);

    res.status(HTTP_RESPONSE_CODE.CREATED).json(
        new ApiResponse(HTTP_RESPONSE_CODE.CREATED, { featureName: feature.name, featureId: sqids.encode([feature.id]) }),
    );
}
