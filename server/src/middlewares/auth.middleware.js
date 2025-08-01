import { ApiError } from "#utils/api.error";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    // postman sends the token as Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "No token provided or token is malformed");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new ApiError(401, "Invalid token");
        }

        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
