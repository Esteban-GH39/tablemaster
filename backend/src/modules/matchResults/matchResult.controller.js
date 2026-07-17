import { registerMatchResult } from "./matchResult.service.js";

export const registerMatchResultController = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const { sets } = req.body;
        const result = await registerMatchResult(matchId, sets);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};