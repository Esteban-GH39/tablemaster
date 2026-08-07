import apiCLient from "../api/apiClient";

export const getPlayerStatistics = async (playerId) => {
    const response = await apiCLient.get(`/statistics/player/${playerId}`);
    return response.data;
};

export const getTournamentStatistics = async(tournamentId) => {
    const response = await apiCLient.get(`/statistics/tournament/${tournamentId}`);
    return response.data;
};