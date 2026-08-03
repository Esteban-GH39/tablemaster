import apiClient from "../../api/apiClient.js";

export const login = async (credentials) => {

    const response = await apiClient.post(

        "/auth/login",

        credentials

    );

    return response.data;

};

export const register = async ({ fullName, email, password }) => {

    const response = await apiClient.post(
        "/users",
        { fullName, email, password, role: "player" }
    );

    return response.data;

};