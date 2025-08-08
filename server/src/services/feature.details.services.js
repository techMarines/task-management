import prisma from "#config/prisma.client";

export async function updateFeatureDetails(featureId, updateData) {
    await prisma.featureDetail.update({
        where: {
            featureId: featureId,
        },
        data: updateData,
    });
}
