import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as authServices from "#services/auth.services";
import { ApiResponse } from "#utils/api.response";
import { ApiError } from "#utils/api.error";
import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";

export async function register(req, res) {
    const { userName, password } = req.body;

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await authServices.checkIfUserExists(userName);
    if (user) {
        throw new ApiError(
            HTTP_RESPONSE_CODE.CONFLICT,
            "user already registered, login in instead",
        );
    }

    const createdUser = await authServices.createUser(userName, hashedPassword);

    // create a token
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(HTTP_RESPONSE_CODE.CREATED).json(
        new ApiResponse(
            HTTP_RESPONSE_CODE.CREATED,
            { displayName: createdUser.displayName, token },
            "User registered successfuly",
        ),
    );
}

export async function login(req, res) {
    const { userName, password } = req.body;

    const user = await authServices.checkIfUserExists(userName);
    if (!user) {
        // being intentionally vague about correctness of username to make it harder to randomly guess username
        throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Wrong username or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
    if (!isPasswordValid) {
        throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Wrong username or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        new ApiResponse(HTTP_RESPONSE_CODE.SUCCESS, { token }, "User logged in successfuly"),
    );
}
