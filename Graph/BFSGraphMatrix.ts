export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false); // Track visited node
    const prev = new Array(graph.length).fill(-1); // Track the path

    const q = [source];
    seen[source] = false;

    do {
        const curr = q.shift() as number;

        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];

        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }

        seen[curr] = true;
    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    let curr = needle;
    const out = [];
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    return [source].concat(out.reverse());
}
