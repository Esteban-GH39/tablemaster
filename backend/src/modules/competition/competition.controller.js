import { generateBracket } from "./competition.service.js";

export const generateBracketController = async (req, res) => {
    try {
        const tournamentId = Number(req.params.id);

        const matches = await generateBracket(tournamentId);

        res.status(201).json(matches);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};