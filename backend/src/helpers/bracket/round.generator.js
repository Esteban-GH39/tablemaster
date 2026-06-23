export const getFirstRoundName = (playersCount) => {
    if (playersCount === 2) return "Final";
    if (playersCount === 4) return "Semifinal";
    if (playersCount === 8) return "Quarterfinal";
    if (playersCount === 16) return "Round of 16";
    if (playersCount === 32) return "Round of 32";
    return "Round 1";
};