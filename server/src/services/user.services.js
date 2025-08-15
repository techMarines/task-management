import prisma from "#config/prisma.client";

export async function updateUserDisplayName(userId, newDisplayName) {
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            displayName: newDisplayName,
        },
    });
}

export async function getUserById(userId) {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}

export async function getUserVerificationStatus(userId) {
    // return verification status
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}
