import apiClient from "../api/apiClient";

export const startCompetition = async (tournamentId) => {
    const response = await apiClient.post(`/competition/${tournamentId}/start`);
    return response.data;
};