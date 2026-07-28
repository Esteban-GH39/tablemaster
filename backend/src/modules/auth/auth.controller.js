import { login, getMe } from "./auth.service.js";

export const loginController = async (req, res) => {
    try {
        const result = await login(req.body);
        res.json(result);
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

export const getMeController = async (req, res) => {
    try {
        const result = await getMe(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};