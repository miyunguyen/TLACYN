type Point = {
    x: number;
    y: number;
};

const dir = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Base case:

    // 1. off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // 2. is wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // 3. end point
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // 4. has seen
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // pre

    seen[curr.y][curr.x] = true;
    path.push(curr);

    // recurse

    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[i].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
