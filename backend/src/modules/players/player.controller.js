import { getAllPlayers, getPlayerById , createPlayer } from "./player.service.js";

export const getPlayers = (req, res) => {
    const players = getAllPlayers();
    res.json(players);
}

export const getPlayerByIdController = (re, res) => {
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