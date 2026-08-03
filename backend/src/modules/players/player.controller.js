import { getAllPlayers, getPlayerById, getPlayerByUserId, createPlayer, updatePlayer, patchPlayer, deletePlayer } from "./player.service.js";

export const getPlayers = async (req, res) => {
    try{
        const players = await getAllPlayers();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: "Error fetching players" });
    }
}

export const getPlayerByIdController = async (req, res) => {
    try{
        const player = await getPlayerById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        return res.json(player);
    } catch (error) {
        res.status(500).json({ message: "Error fetching player" });
    }
}

export const createPlayerController = async (req, res) => {
    try {
        let userId = null;
        if (req.user.role === "player") {
            const existingPlayer = await getPlayerByUserId(req.user.id);
            if (existingPlayer) {
                return res.status(400).json({
                    message: "This user already has a player profile"
                });
            }
            userId = req.user.id;
        }
        const newPlayer = await createPlayer({
            ...req.body,
            userId
        });
        return res.status(201).json({
            message: "Player created successfully",
            player: newPlayer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating player"
        });
    }
};

export const updatePlayerController = async (req, res) => {
    try {
        const updatedPlayer = await updatePlayer(req.params.id, req.body);
        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        return res.json({
            message: "Player updated successfully",
            player: updatedPlayer
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating player" });
    }
}

export const patchPlayerController = async (req, res) => {
    try {
        const updatedPlayer = await patchPlayer(req.params.id, req.body);
        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        return res.json({
            message: "Player updated successfully",
            player: updatedPlayer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating player" });
    }
}

export const deletePlayerController = async (req, res) => {
    try {
        const deletedPlayer = await deletePlayer(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        } 
        return res.json({
            message: "Player deleted successfully",
            player: deletedPlayer
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting player" });
    }
}