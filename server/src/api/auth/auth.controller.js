import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as authServices from "#services/auth.services";
import { ApiResponse } from "#utils/api.response";
import { ApiError } from "#utils/api.error";

export async function register(req, res) {
    const { userName, password } = req.body;

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const userAlreadyRegistered = await authServices.checkIfUserExists(userName);
    if (userAlreadyRegistered) {
        throw new ApiError(409, "user already registered, login in instead");
    }

    const user = await authServices.createUser(userName, hashedPassword);

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json(new ApiResponse(201, { token }, "User registered successfuly"));
}

export async function login(req, res) {
    const { userName, password } = req.body;

    const userAlreadyRegistered = await authServices.checkIfUserExists(userName);
    if (!userAlreadyRegistered) {
        // being intentionally vague about correctness of username to make it harder to randomly guess username
        throw new ApiError(401, "Wrong username or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, userAlreadyRegistered.hashedPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, "Wrong username or password");
    }

    const token = jwt.sign({ id: userAlreadyRegistered.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    res.status(200).json(new ApiResponse(200, { token }, "User logged in successfuly"));
}
