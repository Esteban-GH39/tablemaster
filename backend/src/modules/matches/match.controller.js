import { getAllMatches, getMatchById, createMatch, updateMatch, patchMatch, deleteMatch } from "./match.service.js";

export const getMatchesController = async (req, res) => {
    try {
        const matches = await getAllMatches();
        res.json(matches);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getMatchByIdController = async (req, res) => {
    try {
        const match = await getMatchById(req.params.id);
        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }
        res.json(match);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createMatchController = async (req, res) => {
    try {
        const match = await createMatch(req.body);
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateMatchController = async (req, res) => {
    try {
        const match = await updateMatch(
            req.params.id,
            req.body
        );
        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }
        res.json(match);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const patchMatchController = async (req, res) => {
    try {
        const match = await patchMatch(
            req.params.id,
            req.body
        );
        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }
        res.json(match);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteMatchController = async (req, res) => {
    try {
        const match = await deleteMatch(req.params.id);
        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }
        res.json(match);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};