import { registerPlayer, getTournamentPlayers, removePlayerFromTournament } from "./tournamentPlayer.service.js";

export const registerPlayerController = async (req, res) => {
    try {
        const tournamentId = Number(req.params.id);
        const { playerId } = req.body;
        const registration = await registerPlayer(
            tournamentId,
            playerId
        );
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getTournamentPlayersController = async (req, res) => {
    const tournamentId = Number(req.params.id);
    const players = await getTournamentPlayers(tournamentId);
    res.json(players);
};

export const removePlayerFromTournamentController = async (req, res) => {
    const tournamentId = Number(req.params.id);
    const playerId = Number(req.params.playerId);
    const deleted = await removePlayerFromTournament(tournamentId, playerId);
    if (!deleted) {
        return res.status(404).json({
            message: "Player not registred"
        })
    }
    res.json(deleted);
};