import apiClient from "../api/apiClient";

export const registerMatchResult = async (matchMedia, sets) => {
    const response = await apiClient.post(`/match-results/${matchId}`, { sets });
    return response.data
}