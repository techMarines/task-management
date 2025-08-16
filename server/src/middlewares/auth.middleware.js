import sqids from "#config/sqids";
import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import { ApiError } from "#utils/api.error";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const token = req.cookies.jwt_token;

    if (!token) {
        throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "No token provided, authorization denied");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Invalid token");
        }

        const decodedSqidId = sqids.decode(decoded.id)[0];
        req.userId = decodedSqidId;
        next();
    });
}

export default authMiddleware;
