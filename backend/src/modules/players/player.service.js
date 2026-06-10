const players = [
    { id: 1, name: "Player 1", level: 5 },
];

export const getAllPlayers = () => {
    return players;
}

export const getPlayerById = (id) => {
    return players.find(player => player.id === Number(id));
}

export const createPlayer = (playerData) => {
    const newPlayer = { id: Date.now(), ...playerData };
    players.push(newPlayer);
    return newPlayer;
}

export const updatePlayer = (id, playerData) => {
    const player = players.find(player => player.id === Number(id))
    if (!player) {
        return null;
    }
    player.name = playerData.name || player.name;
    return player;
}

export const deletePlayer = (id) => {
    const playerIndex = players.findIndex(player => player.id === Number(id))
    if (playerIndex === -1) {
        return false;
    }
    const deletedPlayer = players[playerIndex];
    players.splice(playerIndex, 1);
    return deletedPlayer;
}