export const nextPowerOfTwo = (entries) => {
    let power = 1;
    while (power < entries) {
        power *= 2;
    }
    return power;
};

export const calculateRounds = (entries) => {
    const total = nextPowerOfTwo(entries);
    const rounds = [];
    let players = total;
    while (players > 1) {
        if (players === 2) {
            rounds.push("Final");
        } else if (players === 4) {
            rounds.push("Semifinal");
        } else if (players === 8) {
            rounds.push("Quarterfinal");
        } else if (players === 16) {
            rounds.push("Round of 16");
        } else if (players === 32) {
            rounds.push("Round of 32");
        } else {
            rounds.push(`Round of ${players}`);
        }
        players /= 2;
    }
    return rounds.reverse();
};