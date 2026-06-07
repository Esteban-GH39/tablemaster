import { getAllPlayers } from "./player.service.js";

export const getPlayers = (req, res) => {
    const players = getAllPlayers();
    res.json(players);
}
