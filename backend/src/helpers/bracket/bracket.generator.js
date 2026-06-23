export const generateBracket = (players) => {
    const matches = [];
    let order = 1;
    for (let i = 0; i < players.length; i += 2) {
        matches.push({
            playerOneId: players[i].player_id,
            playerTwoId: players[i + 1]?.player_id ?? null,
            round: "Round 1",
            matchOrder: order++
        });
    }
    return matches;
};