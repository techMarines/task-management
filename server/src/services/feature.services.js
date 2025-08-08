import prisma from "#config/prisma.client";

export async function checkFeatureExistsForCategory(featureName, categoryId) {
    const featureExists = await prisma.feature.findFirst({
        where: {
            name: featureName,
            categoryId: categoryId,
        },
    });

    return !!featureExists;
}

export async function createFeature(featureName, categoryId, featureParentId) {
    return await prisma.$transaction(async (tx) => {
        const feature = await tx.feature.create({
            data: {
                name: featureName,
                categoryId: categoryId,
                parentId: featureParentId,
            },
        });

        await tx.featureDetail.create({
            data: {
                featureId: feature.id,
            },
        });

        return feature;
    });
}
