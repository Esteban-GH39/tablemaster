import { nextPowerOfTwo } from "./round.generator.js";

export const calculateByes = (entries) => {
    const totalSlots = nextPowerOfTwo(entries);
    return totalSlots - entries;
};

export const insertByes = (entries) => {
    const byes = calculateByes(entries.length);
    const result = [...entries];
    for (let i = 0; i < byes; i++) {
        result.push(null);
    }
    return result;
};