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
