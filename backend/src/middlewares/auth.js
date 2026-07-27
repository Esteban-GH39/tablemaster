import { verifyToken } from "../utils/jwt.js";

export const auth = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyToken(token);

        req.user = payload;

        next();

    } catch {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};