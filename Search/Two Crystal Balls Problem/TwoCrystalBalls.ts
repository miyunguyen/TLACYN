export default function two_crystal_balls(breaks: boolean[]): number {
    const jump_step: number = Math.floor(Math.log2(breaks.length));
    let last_safe_point: number = -1;
    for (let i = 0; i < breaks.length; i += jump_step) {
        if (breaks[i] === false) {
            last_safe_point = i;
        } else {
            break;
        }
    }

    for (
        let i = last_safe_point;
        i < last_safe_point + jump_step && i < breaks.length;
        ++i
    ) {
        if (breaks[i] === true) {
            return i;
        }
    }

    return -1;
}
