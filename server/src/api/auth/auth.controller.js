import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as authServices from "#services/auth.services";
import { ApiResponse } from "#utils/api.response";
import { ApiError } from "#utils/api.error";
import { HTTP_RESPONSE_CODE } from "#constants/api.response.codes";
import transporter from "#config/nodemailer";
import sqids from "#config/sqids";

const saltRounds = 12;

export async function register(req, res) {
    const { userName, password } = req.body;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await authServices.checkIfUserExists(userName);
    if (user) {
        throw new ApiError(HTTP_RESPONSE_CODE.CONFLICT, "user already registered, login in instead");
    }

    const createdUser = await authServices.createUser(userName, hashedPassword);
    const encodedCreateUserId = await sqids.encode([createdUser.id]);

    // create a token
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(HTTP_RESPONSE_CODE.CREATED).json(
        new ApiResponse(
            HTTP_RESPONSE_CODE.CREATED,
            { userId: encodedCreateUserId, displayName: createdUser.displayName, token },
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

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
        throw new ApiError(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Wrong username or password");
    }

    const encodedUserId = await sqids.encode([user.id]);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        new ApiResponse(
            HTTP_RESPONSE_CODE.SUCCESS,
            { userId: encodedUserId, displayName: user.displayName, token },
            "User logged in successfuly",
        ),
    );
}

export async function sendLinkForEmailVerification(req, res) {
    const userId = req.userId;

    const user = await authServices.getUserById(userId);
    // should never happend unless user was deleted for some reason or server crashed
    if (!user) {
        throw new ApiError(HTTP_RESPONSE_CODE.SERVER_ERROR, "User not found");
    }

    const randomToken = crypto.randomUUID();
    const urlToVerifyEmail = `http://localhost:5173/auth/verify-email/${randomToken}`;

    (async () => {
        const info = await transporter.sendMail({
            from: `"orbit.io200" <${process.env.EMAIL}>`,
            to: user.name,
            subject: "Verify your email for orbit sign up",
            text: `The link to verify your email for orbit account creation has been attached below, If this action wasn't performed by you then please
                   use the report button to stop unverified sign up attempt using your email!.`,
            html: `<a href=${urlToVerifyEmail}>`,
        });

        console.log(info);
    })();
}

export async function verifyEmail(req, res) {
    const token = req.params;
}
