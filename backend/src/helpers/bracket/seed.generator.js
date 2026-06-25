export const randomSeeding = (entries) => {
    const shuffled = [...entries];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const rankingSeeding = (entries) => {
    return [...entries].sort((a, b) => {
        if (a.seed == null && b.seed == null) return 0;
        if (a.seed == null) return 1;
        if (b.seed == null) return -1;
        return a.seed - b.seed;
    });
};

export const snakeSeeding = (entries) => {
    const ordered = rankingSeeding(entries);
    const result = [];
    let left = 0;
    let right = ordered.length - 1;
    while (left <= right) {
        result.push(ordered[left]);
        if (left !== right) {
            result.push(ordered[right]);
        }
        left++;
        right--;
    }
    return result;
};

export const generateSeeds = (entries, method = "snake") => {
    switch (method) {
        case "random":
            return randomSeeding(entries);
        case "ranking":
            return rankingSeeding(entries);
        default:
            return snakeSeeding(entries);
    }
};