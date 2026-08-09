import apiClient from "../api/apiClient";

export const getGroups = async (tournamentId) => {
    const response = await apiClient.get(`/tournaments/${tournamentId}/groups`);
    return response.data;
};