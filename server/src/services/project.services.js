import prisma from "#config/prisma.client";

export async function createProject(projectName, projectDescription) {
    return await prisma.project.create({
        data: {
            name: projectName,
            description: projectDescription,
        },
    });
}
