import { login, getMe, forgotPassword, resetPassword } from "./auth.service.js";

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

export const forgotPasswordController = async (req, res) => {
    try {
        await forgotPassword(req.body.email);
        res.json({
            message: "Si el correo está registrado, se envió un enlace de recuperación."
        });
    } catch (error) {
        res.status(500).json({
            message: "No se pudo procesar la solicitud"
        });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        await resetPassword(req.body);
        res.json({
            message: "Contraseña actualizada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

