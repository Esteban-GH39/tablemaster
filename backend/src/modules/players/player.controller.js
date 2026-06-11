import { getAllPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } from "./player.service.js";

export const getPlayers = (req, res) => {
    const players = getAllPlayers();
    res.json(players);
}

export const getPlayerByIdController = (req, res) => {
    const player = getPlayerById(req.params.id);

    if (!player) {
        return res.status(404).json({
        message: "Player not found"
        });
    }

    return res.json(player);

}

export const createPlayerController = (req, res) => {
    const newPlayer = createPlayer(req.body)
    return res.status(201).json({
        message: "Player created successfully",
        player: newPlayer
    })
}

export const updatePlayerController = (req, res) => {
    const updatedPlayer = updatePlayer(req.params.id, req.body)
    return res.json({
        message: "Player updated successfully",
        player: updatedPlayer
    })
}

export const deletePlayerController = (req, res) => {
    const deletedPlayer = deletePlayer(req.params.id);
    if (!deletedPlayer) {
        return res.status(404).json({ message: "Player not found" });
    }
    return res.json({
        message: "Player deleted successfully",
        player: deletedPlayer
    })
}