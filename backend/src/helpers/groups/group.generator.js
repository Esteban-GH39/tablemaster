export const calculateGroups = (entries) => {
    if (entries <= 8) return 2;
    if (entries <= 16) return 4;
    if (entries <= 32) return 8;
    return Math.ceil(entries / 4);
};

export const generateGroups = (entries) => {
    const totalGroups = calculateGroups(entries.length);
    const groups = [];
    for (let i = 0; i < totalGroups; i++) {
        groups.push({
            name: String.fromCharCode(65 + i),
            entries: []
        });
    }
    let direction = 1;
    let index = 0;
    for (const entry of entries) {
        groups[index].entries.push(entry);
        if (direction === 1) {
            if (index === groups.length - 1) {
                direction = -1;
            } else {
                index++;
            }
        } else {
            if (index === 0) {
                direction = 1;
            } else {
                index--;
            }
        }
    }
    return groups;
};