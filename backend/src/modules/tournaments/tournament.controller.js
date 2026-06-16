import {
    getAllTournaments, getTournamentById, createTournament, updateTournament, patchTournament, deleteTournament } from "./tournament.service.js";

export const getTournaments = async (req, res) => {
    try {
        const tournaments = await getAllTournaments();
        res.json(tournaments);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tournaments"
        });
    }
};

export const getTournamentByIdController = async (req, res) => {
    try {
        const tournament = await getTournamentById(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.json(tournament);

    } catch {
        res.status(500).json({
            message: "Error fetching tournament"
        });
    }
};

export const createTournamentController = async (req, res) => {
    try {
        const tournament = await createTournament(req.body);

        res.status(201).json({
            message: "Tournament created successfully",
            tournament
        });

    } catch {
        res.status(500).json({
            message: "Error creating tournament"
        });
    }
};

export const updateTournamentController = async (req, res) => {
    try {
        const tournament = await updateTournament(req.params.id, req.body);

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.json({
            message: "Tournament updated successfully",
            tournament
        });

    } catch {
        res.status(500).json({
            message: "Error updating tournament"
        });
    }
};

export const patchTournamentController = async (req, res) => {
    try {
        const tournament = await patchTournament(req.params.id, req.body);

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.json({
            message: "Tournament updated successfully",
            tournament
        });

    } catch {
        res.status(500).json({
            message: "Error updating tournament"
        });
    }
};

export const deleteTournamentController = async (req, res) => {
    try {
        const tournament = await deleteTournament(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.json({
            message: "Tournament deleted successfully",
            tournament
        });

    } catch {
        res.status(500).json({
            message: "Error deleting tournament"
        });
    }
};