import apiClient from "../../api/apiClient.js";

export const login = async (credentials) => {

    const response = await apiClient.post(

        "/auth/login",

        credentials

    );

    return response.data;

};