import { verifyToken } from "../utils/jwt.js";

export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(" ")[1];
            req.user = verifyToken(token);
        }
    } catch {
    }

    next();
};
