import * as service from "./user.service.js";

export const getUsersController = async (req, res, next) => {
    try {
        const users = await service.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.getUserById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const createUserController = async (req, res, next) => {
    try {
        const isAdminCreating = req.user?.role === "admin";
        let role = "player";

        if (isAdminCreating) {
            role = req.body.role;
        } else {
            const existingUsers = await service.countUsers();
            if (existingUsers === 0) {
                role = "admin";
            }
        }

        const user = await service.createUser({ ...req.body, role });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.updateUser(id, req.body);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const patchUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.patchUser(id, req.body);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.deleteUser(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};