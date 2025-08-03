import prisma from "#config/prisma.client";

export async function createProjectRole(roleName, projectId) {
    return await prisma.projectRole.create({
        data: {
            projectId: projectId,
            name: roleName,
        },
    });
}
