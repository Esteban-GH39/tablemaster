import apiClient from "../api/apiClient";

export const getTournaments = async () => {
    const response = await apiClient.get("/tournaments");
    return response.data;
};