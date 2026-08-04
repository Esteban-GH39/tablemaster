export const capitalize = (text = "") => {
    return text
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};