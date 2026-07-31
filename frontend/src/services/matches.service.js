import apiClient from "../api/apiClient";

export const getMatches = async () => {
    const response = await apiClient.get("/matches");
    return response.data;
};