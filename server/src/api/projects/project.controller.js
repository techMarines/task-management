import { ApiError } from "#utils/api.error";
import { ApiResponse } from "#utils/api.response";
import * as projectServices from "#services/project.services";

export async function createProject(req, res) {
    // userId is put into the req by the authMiddleware
    const { userId } = req;
    let { projectName, projectDescription } = req.body;

    // validate input
    if (!projectName) throw new ApiError(400, "project name can't be empty");
    if (!projectDescription) projectDescription = `${projectName}`;

    // this calls a function which uses transaction to create project then create a project role 'manager' and assign it to user
    const project = await projectServices.createProjectForUser(
        userId,
        projectName,
        projectDescription,
    );
    // project is returned if all queries were successfull
    if (!project) throw new ApiError(500, "internal server error, project not created");

    res.status(201).json(
        new ApiResponse(
            201,
            {
                projectName: project.name,
                projectDescription: project.description,
                starterRole: "Manager",
            },
            "project created successfuly",
        ),
    );
}
