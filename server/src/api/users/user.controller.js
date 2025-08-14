import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import * as userServices from "#services/user.services";
import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";

export async function updateUserDisplayName(req, res) {
    const userId = req.userId;
    let { newDisplayName: rawNewDisplayName } = req.body;

    const newDisplayName = rawNewDisplayName
        .trim() // remove leading/trailing spaces
        .split(" ") // split at blank spaces
        .filter((str) => str) // returns an array of non empty strings
        .join(" "); // join all words with single space

    const user = await userServices.updateUserDisplayName(userId, newDisplayName);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        new ApiResponse(HTTP_RESPONSE_CODE.SUCCESS, { displayName: user.displayName }, "Display Name updated successfuly"),
    );
}
