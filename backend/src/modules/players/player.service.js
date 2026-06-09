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