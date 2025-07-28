import * as userServices from "../../services/userServices.js";

export async function getAllUsers(req, res) {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json({
            message: "Successfuly retrieved all users",
            users: users,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving users",
            error: err.message,
        });
    }
}

export async function createUser(req, res) {
    try {
        const { userName, hashedPassword } = req.body;

        const userExists = await userServices.checkUserExists(
            userName,
            hashedPassword,
        );
        console.log(userExists);
        if (userExists) {
            return res
                .status(409)
                .json({
                    message:
                        "account already exists with given credentials please log in instead",
                });
        }
        await userServices.createUser(userName, hashedPassword);

        res.status(201).json({ message: "user created successfully" });
    } catch (err) {
        res.status(500).json({
            message: "Error while creating user",
            error: err.message,
        });
    }
}
