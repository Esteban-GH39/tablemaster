import apiClient from "../api/apiClient";

export const getTournaments = async () => {
    const { data } = await apiClient.get("/tournaments");
    return data;
};

export const createTournament = async (tournament) => {
    const { data } = await apiClient.post(
        "/tournaments",
        tournament
    );
    return data.tournament;
};

export const updateTournament = async (id, tournament) => {
    const { data } = await apiClient.put(
        `/tournaments/${id}`,
        tournament
    );
    return data.tournament;
};

export const deleteTournament = async (id) => {
    const { data } = await apiClient.delete(
        `/tournaments/${id}`
    );
    return data;
};