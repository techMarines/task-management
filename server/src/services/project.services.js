import prisma from "#config/prisma.client";

// creates a project, creates a manager role for the project, assigns the manager role to the creater
export async function createProjectForUser(createrUserId, projectName, projectDescription) {
    // start an interactive transaction by passing a function to $transaction
    return await prisma.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                name: projectName,
                description: projectDescription,
            },
        });

        const managerRole = await tx.projectRole.create({
            data: {
                name: "Manager",
                projectId: project.id, // use the id from the project created by above query
                deletePermission: true,
                writePermissoin: true,
            },
        });

        await tx.userProject.create({
            data: {
                userId: createrUserId,
                projectId: project.id,
                roleId: managerRole.id, // assign manager role to the creator of the project
            },
        });

        return project;
    });
}
