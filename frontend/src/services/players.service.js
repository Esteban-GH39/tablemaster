import apiClient from "../api/apiClient";

export const getPlayers = async () => {
    const response = await apiClient.get("/players");
    return response.data;
};