import { getPlayerOwner } from "../modules/players/player.service.js";

export const playerOwner = async (req, res, next) => {
    try {
        if (
            req.user.role === "admin" ||
            req.user.role === "organizer"
        ) {
            return next();
        }
        const owner = await getPlayerOwner(req.params.id);
        if (!owner) {
            return res.status(404).json({
                message: "Player not found"
            });
        }
        if (owner.user_id !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};