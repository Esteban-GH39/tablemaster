const nextPowerOfTwo = (number) => {
    let power = 1;
    while (power < number) {
        power *= 2;
    }
    return power;
};
export const generateByes = (players) => {
    const bracketSize = nextPowerOfTwo(players.length);
    const byes = bracketSize - players.length;
    const list = [...players];
    for (let i = 0; i < byes; i++) {
        list.push({
            player_id: null,
            bye: true
        });
    }
    return list;
};