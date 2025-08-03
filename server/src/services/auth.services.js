import prisma from "#config/prisma.client";
import { generateRandomName } from "#utils/random.name.generator";

export async function createUser(userName, hashedPassword) {
    return await prisma.user.create({
        data: {
            name: userName,
            hashedPassword: hashedPassword,
            displayName: generateRandomName(),
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
