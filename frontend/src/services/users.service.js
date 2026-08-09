import apiClient from "../api/apiClient";

export const getUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await apiClient.patch(`/users/${id}`, { role });
    return response.data;
};

export const setUserActive = async (id, isActive) => {
    const response = await apiClient.patch(`/users/${id}`, { isActive });
    return response.data;
};
