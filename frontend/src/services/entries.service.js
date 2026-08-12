import apiClient from "../api/apiClient";

export const getEntries = async (tournamentId) => {
    const response = await apiClient.get(`/tournaments/${tournamentId}/entries`);
    return response.data;
};

export const createEntry = async (tournamentId, data) => {
    const response = await apiClient.post(
        `/tournaments/${tournamentId}/entries`,
        data
    );
    return response.data;
};

export const deleteEntry = async (entryId) => {
    const response = await apiClient.delete(`/tournaments/entries/${entryId}`);
    return response.data;
};

export const joinTournament = async (tournamentId) => {
    const response = await apiClient.post(
        `/tournaments/${tournamentId}/entries/self`
    );
    return response.data;
};

export const leaveTournament = async (tournamentId) => {
    const response = await apiClient.delete(
        `/tournaments/${tournamentId}/entries/self`
    );
    return response.data;
};