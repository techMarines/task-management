import apiClient from "#config/api";

export async function createUserProject(projectName, projectDescription) {
    try {
        const response = await apiClient.post("/project/create", {
            projectName: projectName,
            projectDescription: projectDescription,
        });

        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't create project";
    }
}

export async function getUserProjects() {
    try {
        const response = await apiClient.get("/project/user/me", {});
        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't create project";
    }
}

export async function updateActiveProject(projectId) {
    try {
        const response = await apiClient.patch("/user/me/updateUserActiveProject", {
            projectId: projectId,
        });

        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't set the project as active";
    }
}
