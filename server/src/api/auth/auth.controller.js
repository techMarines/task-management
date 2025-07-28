import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as authServices from "../../services/authServices.js";

export async function register(req, res) {
    try {
        const { userName, password } = req.body;

        // encrypt the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        const userAlreadyRegistered = await authServices.checkIfUserExists(userName);
        if (userAlreadyRegistered) {
            return res.status(409).json({
                message: "user already registered with current userName, log in instead",
            });
        }

        const user = await authServices.createUser(userName, hashedPassword);

        // create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(201).json({ message: "user registered successfuly", token: token });
    } catch (err) {
        res.status(500).json({
            message: "error while registering user",
            error: err,
        });
    }
}

export async function login(req, res) {
    try {
        const { userName, password } = req.body;

        const userAlreadyRegistered = await authServices.checkIfUserExists(userName);
        if (!userAlreadyRegistered) {
            // being intentionally vague about correctness of username to make it harder to randomly guess username
            return res.status(401).json({
                message: "Wrong username or password",
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, userAlreadyRegistered.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong username or password" });
        }

        const token = jwt.sign({ id: userAlreadyRegistered.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.status(200).json({ message: "logged in successfuly", token: token });
    } catch (err) {
        res.status(500).json({ message: "error while logining in user", error: err.message });
    }
}
