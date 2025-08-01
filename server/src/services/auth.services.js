import prisma from "#config/prisma.client";

export async function createUser(userName, hashedPassword) {
    return await prisma.user.create({
        data: {
            name: userName,
            hashedPassword: hashedPassword,
        },
    });
}

export async function checkIfUserExists(userName) {
    return await prisma.user.findFirst({
        where: {
            name: userName,
        },
    });
}
