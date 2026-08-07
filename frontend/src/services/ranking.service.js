import apiClient from "../api/apiClient";

export const getGlobalRanking = async () => {
    const response = await apiClient.get("/ranking");
    return response.data;
};

export const getTournamentRanking = async (tournamentId) => {
    const response = await apiClient.get(`/ranking/tournament/${tournamentId}`);
    return response.data;
};