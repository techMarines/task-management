import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import * as categoryServices from "#services/category.services";
import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";
import sqids from "#config/sqids";

export async function createCategory(req, res) {
    const userId = req.userId;
    const { encodedProjectId, categoryName, categoryColorCode } = req.body;
    let { categoryDescription, categoryParentId } = req.body;

    if (!encodedProjectId || !categoryName || !categoryColorCode)
        throw new ApiError(HTTP_RESPONSE_CODE.BAD_REQUEST, "required fields not provided for category");

    const [projectId] = sqids.decode(encodedProjectId);

    // check if user is authorized to perform this action
    const userAuthorized = await categoryServices.canUserCreateCategory(userId, projectId);

    if (!userAuthorized)
        throw new ApiError(
            HTTP_RESPONSE_CODE.UNAUTHORIZED,
            "not authorized to perform this action, check if you have writePermission for the project",
        );

    const categoryAlreadyExists = await categoryServices.getProjectCategoryByName(categoryName, projectId);
    if (categoryAlreadyExists) throw new ApiError(HTTP_RESPONSE_CODE.CONFLICT, "Category already exists in the project");

    const category = await categoryServices.createCategory(
        projectId,
        categoryName,
        categoryDescription,
        categoryColorCode,
        categoryParentId,
    );

    res.status(HTTP_RESPONSE_CODE.CREATED).json(
        new ApiResponse(
            HTTP_RESPONSE_CODE.CREATED,
            {
                categoryId: sqids.encode([category.id]),
                categoryName: category.name,
            },
            "Category created successfuly",
        ),
    );
}
