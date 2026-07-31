import apiClient from "../api/apiClient";

export const getTeams = async () => {
    const response = await apiClient.get("/teams");
    return response.data;
};