import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import { ApiError } from "#utils/api.error";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    // postman sends the token as Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(
            HTTP_RESPONSE_CODE.UNAUTHORIZED,
            "No token provided or token is malformed",
        );
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Invalid token");
        }

        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
