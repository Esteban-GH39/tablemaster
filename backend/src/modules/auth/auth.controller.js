import { login } from "./auth.service.js";

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