export const generateSeeds = (entries) => {
    return [...entries].sort((a, b) => {
        if (a.seed === null && b.seed === null) {
            return 0;
        }
        if (a.seed === null) {
            return 1;
        }
        if (b.seed === null) {
            return -1;
        }
        return a.seed - b.seed;
    });
};