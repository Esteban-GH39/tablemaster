export const isEmpty = (value) => {
    return value.trim() === "";
};

export const isPositive = (value) => {
    return Number(value) > 0;
};