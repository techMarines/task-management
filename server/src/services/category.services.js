import prisma from "#config/prisma.client";

export async function getProjectCategoryByName(categoryName, projectId) {
    const existingCategory = await prisma.category.findFirst({
        where: {
            name: categoryName,
            projectId: projectId,
        },
    });

    return !!existingCategory;
}

// prettier-ignore
export async function createCategory(projectId, categoryName, categoryDescription, categoryColorCode, categoryParentId) {
    return await prisma.category.create({
        data: {
            projectId: projectId,
            name: categoryName,
            description: categoryDescription,
            colorCode: categoryColorCode,
            parentId: categoryParentId
        }
    })
}

export async function canUserCreateCategory(userId, projectId) {
    return await prisma.$transaction(async (tx) => {
        const userProjectRelation = await tx.projectUser.findUnique({
            where: {
                // findUnique using compound keys
                userId_projectId: {
                    userId: userId,
                    projectId: projectId,
                },
            },
        });

        if (!userProjectRelation) return false;

        const userRole = await tx.projectRole.findUnique({
            where: {
                id: userProjectRelation.roleId,
            },
        });

        if (!userRole.writePermission) return false;

        return true;
    });
}
