import apiClient from "../api/apiClient";

export const getMatches = async (tournamentId) => {
    const response = await apiClient.get("/matches", {
        params: tournamentId ? { tournamentId } : {}
    });
    return response.data;
};

export const getMatchById = async (id) => {
    const response = await apiClient.get(`/matches/${id}`);
    return response.data;
};

export const createMatch = async (match) => {
    const response = await apiClient.post("/matches", match);
    return response.data;
};

export const updateMatch = async (id, match) => {
    const response = await apiClient.put(`/matches/${id}`, match);
    return response.data;
};

export const deleteMatch = async (id) => {
    const response = await apiClient.delete(`/matches/${id}`);
    return response.data;
};

export const getHeadToHead = async (playerOneId, playerTwoId) => {
    const response = await apiClient.get("/matches/head-to-head", {
        params: { playerOneId, playerTwoId }
    });
    return response.data;
};

export const proposeFriendlyMatch = async ({ opponentId, sets, setsToWin }) => {
    const response = await apiClient.post("/matches/friendly", {
        opponentId,
        sets,
        setsToWin
    });
    return response.data;
};

export const getPendingConfirmations = async () => {
    const response = await apiClient.get("/matches/pending-confirmations");
    return response.data;
};

export const confirmFriendlyMatch = async (matchId) => {
    const response = await apiClient.post(`/matches/${matchId}/confirm`);
    return response.data;
};

export const rejectFriendlyMatch = async (matchId) => {
    const response = await apiClient.post(`/matches/${matchId}/reject`);
    return response.data;
};
