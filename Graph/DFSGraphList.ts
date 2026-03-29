function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[curr]) {
        return false;
    }

    // visit node and add it to the path
    seen[curr] = true;
    path.push(curr);

    // if node is the needle -> aha, found it
    if (curr === needle) {
        return true;
    }

    // recurse step - explore connected edges
    const list: GraphEdge[] = graph[curr];
    for (let i = 0; i < list.length; ++i) {
        const edge: GraphEdge = list[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // remove node from the path because there no point when going that way
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] | null = [];

    return walk(graph, source, needle, seen, path) ? path : null;
}

// Time: O(V + E) means that we will check every single vertex and every single edge

// Bonus: O(V * E) means that we will check every vertex, and on every vertex we check every edge
