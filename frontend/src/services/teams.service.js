import apiClient from "../api/apiClient";

export const getTeams = async () => {
    const response = await apiClient.get("/teams");
    return response.data;
};

export const createTeam = async (team) => {
    const response = await apiClient.post("/teams", team);
    return response.data;
};

export const updateTeam = async (id, team) => {
    const response = await apiClient.put(`/teams/${id}`, team);
    return response.data;
};

export const deleteTeam = async (id) => {
    const response = await apiClient.delete(`/teams/${id}`);
    return response.data;
};

export const getTeamPlayers = async (teamId) => {
    const response = await apiClient.get(`/teams/${teamId}/players`);
    return response.data;
};

export const addPlayerToTeam = async (teamId, playerId) => {
    const response = await apiClient.post(`/teams/${teamId}/players`, { playerId });
    return response.data;
};

export const removePlayerFromTeam = async (teamId, playerId) => {
    const response = await apiClient.delete(`/teams/${teamId}/players/${playerId}`);
    return response.data;
};