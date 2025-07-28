import prisma from "../config/prismaClient.js";

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export async function createUser(userName, hashedPassword) {
    await prisma.user.create({
        data: {
            name: userName,
            hashedPassword: hashedPassword,
        },
    });
}

export async function checkUserExists(userName, hashedPassword) {
    return await prisma.user.findFirst({
        where: {
            name: userName,
            hashedPassword: hashedPassword,
        },
    });
}
