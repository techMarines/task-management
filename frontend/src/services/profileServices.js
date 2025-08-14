import apiClient from "#config/api";

export async function changeDisplayName(newDisplayName) {
    try {
        const response = await apiClient.patch("user/changeUserDisplayName", {
            newDisplayName: newDisplayName,
        });

        return response.data;
    } catch (err) {
        return err.response.data || "Couldn't change the display name";
    }
}
