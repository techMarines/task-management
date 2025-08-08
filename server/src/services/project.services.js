import prisma from "#config/prisma.client";

export async function checkProjectExistsForUser(projectName, userId) {
    const existingProject = await prisma.project.findFirst({
        where: {
            // match projects with given name
            name: projectName,
            // if any project is related to the given userId then match it.
            projectUsers: {
                some: {
                    userId: userId,
                },
            },
        },
    });

    // first ! converts object to boolean and negates it, second ! negates it to get correct truthy / falsy value.
    return !!existingProject;
}

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
                writePermission: true,
            },
        });

        await tx.projectUser.create({
            data: {
                userId: createrUserId,
                projectId: project.id,
                roleId: managerRole.id, // assign manager role to the creator of the project
            },
        });

        return project;
    });
}

export async function getProjectById() {}
