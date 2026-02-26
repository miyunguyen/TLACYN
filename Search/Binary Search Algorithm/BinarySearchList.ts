export default function bs_list(haystack: number[], needle: number): boolean {
    let low: number = 0;
    let high: number = haystack.length;

    do {
        let middle: number = Math.floor(low + (high - low) / 2);

        let value = haystack[middle];

        if (needle > value) {
            low = middle + 1;
        } else if (needle < value) {
            high = middle;
        } else {
            return true;
        }
    } while (low < high);

    return false;
}
