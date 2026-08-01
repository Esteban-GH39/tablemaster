import apiClient from "../api/apiClient";

export const getPlayers = async () => {
    const response = await apiClient.get("/players");
    return response.data;
};

export const createPlayer = async (player) => {
    const response = await apiClient.post(
        "/players",
        player
    );
    return response.data;
};

export const updatePlayer = async (id, player) => {
    const response = await apiClient.put(
        `/players/${id}`,
        player
    );
    return response.data;
};