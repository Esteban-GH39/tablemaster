import apiClient from "../api/apiClient";

export const createChallenge = async (opponentPlayerId, sets, setsToWin) => {
    const response = await apiClient.post("/challenges", {
        opponentPlayerId,
        sets,
        setsToWin
    });
    return response.data;
};

export const getIncomingChallenges = async () => {
    const response = await apiClient.get("/challenges/incoming");
    return response.data;
};

export const getOutgoingChallenges = async () => {
    const response = await apiClient.get("/challenges/outgoing");
    return response.data;
};

export const confirmChallenge = async (id) => {
    const response = await apiClient.patch(`/challenges/${id}/confirm`);
    return response.data;
};

export const rejectChallenge = async (id) => {
    const response = await apiClient.patch(`/challenges/${id}/reject`);
    return response.data;
};
