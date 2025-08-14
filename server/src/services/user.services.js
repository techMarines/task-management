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
