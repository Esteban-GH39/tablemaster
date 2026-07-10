export const generateRoundRobinMatches = (entries) => {

    const players = [...entries];

    if (players.length % 2 !== 0) {
        players.push(null);
    }

    const rounds = [];
    const totalRounds = players.length - 1;
    const half = players.length / 2;

    for (let round = 0; round < totalRounds; round++) {

        const matches = [];

        for (let i = 0; i < half; i++) {

            const playerOne = players[i];
            const playerTwo = players[players.length - 1 - i];

            if (playerOne && playerTwo) {
                matches.push({
                    playerOne,
                    playerTwo
                });
            }

        }

        rounds.push(matches);

        const fixed = players[0];
        const rotating = players.slice(1);

        rotating.unshift(rotating.pop());

        players.splice(
            0,
            players.length,
            fixed,
            ...rotating
        );

    }

    return rounds;

};