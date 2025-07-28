import prisma from "../config/prismaClient.js";

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}
