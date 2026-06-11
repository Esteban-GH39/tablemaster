const players = [
    {
        id: 1,
        fullName: "Player 1",
        licenseNumber: "COL-001",
        age: 18,
        gender: "male",
        club: "Club Demo",
        rankingPoints: 1000,
        dominantHand: "right"
    }
];

export const getAllPlayers = () => {
    return players;
}

export const getPlayerById = (id) => {
    return players.find(player => player.id === Number(id));
}

export const createPlayer = (playerData) => {
    const newPlayer = {
        id: Date.now(),
        rankingPoints: 0,
        ...playerData 
    };
    players.push(newPlayer);
    return newPlayer;
}

export const updatePlayer = (id, playerData) => {
    const player = players.find(player => player.id === Number(id))
    if (!player) {
        return null;
    }
    Object.assign(player, playerData);
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