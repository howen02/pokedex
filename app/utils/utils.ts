export function capitaliseString(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeDashAndCapitalise(string: String) {
    return string.split("-").map(capitaliseString).join(" ");
}

export function parseLocalStorageString(string: String) {
    return string
        .split(",")
        .map((idString) => parseInt(idString.trim(), 10))
        .filter((n) => !isNaN(n));
}
