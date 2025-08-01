import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    // postman sends the token as Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided or token in malformed" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
