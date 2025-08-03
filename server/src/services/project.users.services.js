import prisma from "#config/prisma.client";

export async function createProjectUserRelation(userId, projectId, roleId) {
    return await prisma.userProject.create({
        data: {
            userId: userId,
            projectId: projectId,
            roleId: roleId,
        },
    });
}
