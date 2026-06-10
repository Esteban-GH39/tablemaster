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
    const { name } = req.body;
    if (!name || name.trim() === "" ) {
        return res.status(400).json({ message: "Name is required" });
    }
    const newPlayer = createPlayer(req.body);
    res.status(201).json({
        message: "Player created successfully",
        player: newPlayer
    });
}

export const updatePlayerController = (req, res) => {
    const { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name is required" });
    }
    const updatedPlayer = updatePlayer(req.params.id, req.body);
    if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
    }
    res.json({
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