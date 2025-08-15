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
        const response = await apiClient.get(`/project/byUserId/${localStorage.getItem("userId")}`, {});
        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't create project";
    }
}

export async function updateActiveProject(projectId) {
    try {
        const response = await apiClient.patch(`/user/${localStorage.getItem("userId")}/updateUserActiveProject`, {
            projectId: projectId,
        });

        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't set the project as active";
    }
}
