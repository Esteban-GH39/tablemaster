import { registerMatchResult } from "./matchResult.service.js";

export const registerMatchResultController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sets } = req.body;
        const result = await registerMatchResult(id, sets);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};