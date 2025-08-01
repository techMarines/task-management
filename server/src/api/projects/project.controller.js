import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";
import * as projectServices from "#services/project.services";

export async function createProject(req, res) {
    let { projectName, projectDescription } = req.body;

    // validate input
    if (!projectName) throw new ApiError(400, "project name can't be empty");
    if (!projectDescription) projectDescription = `${projectName}`;

    const project = await projectServices.createProject(projectName, projectDescription);
    if (!project) throw new ApiError(500, "internal server error, project not created");

    res.status(201).json(
        new ApiResponse(
            201,
            { projectName: project.name, projectDescription: project.description },
            "project created successfuly",
        ),
    );
}
