import { getGroupsByTournament } from "./group.service.js";

export const getGroupsController = async (req, res) => {
    try {
        const groups = await getGroupsByTournament(req.params.id);
        res.json(groups);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};