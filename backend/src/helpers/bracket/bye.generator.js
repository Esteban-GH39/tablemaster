import { nextPowerOfTwo } from "./round.generator.js";

export const calculateByes = (entries) => {
    const totalSlots = nextPowerOfTwo(entries);
    return totalSlots - entries;
};

export const insertByes = (qualified) => {
    if (qualified.length === 4) {
        const a1 = qualified.find(
            p => p.group === "A" && p.position === 1
        );
        const a2 = qualified.find(
            p => p.group === "A" && p.position === 2
        );
        const b1 = qualified.find(
            p => p.group === "B" && p.position === 1
        );
        const b2 = qualified.find(
            p => p.group === "B" && p.position === 2
        );
        return [
            a1,
            b2,
            b1,
            a2
        ];
    }
    const byes = calculateByes(
        qualified.length
    );
    const bracket = [...qualified];
    for (let i = 0; i < byes; i++) {
        bracket.push(null);
    }
    return bracket;
};