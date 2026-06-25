export const generateRoundRobinMatches = (entries) => {
    const matches = [];
    for (let i = 0; i < entries.length; i++) {
        for (let j = i +  1; j < entries.length; j++) {
            matches.push({
                playerOne: entries[i],
                playerTwo: entries[j]
            });
        }
    }
    return matches
};