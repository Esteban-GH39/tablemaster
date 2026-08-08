import apiClient from "../api/apiClient";

const mapUser = (user) => ({
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at
});

export const getUsers = async () => {
    const { data } = await apiClient.get("/users");

    return data.map(mapUser);
};

export const createUser = async (user) => {
    const { data } = await apiClient.post(
        "/users",
        user
    );

    return mapUser(data.user);
};

export const updateUser = async (id, user) => {
    const { data } = await apiClient.put(
        `/users/${id}`,
        user
    );

    return mapUser(data.user);
};

export const deleteUser = async (id) => {
    const { data } = await apiClient.delete(
        `/users/${id}`
    );

    return mapUser(data);
};