/** 
 check if there is any node has not been visited but already reachable from some path to it 
*/
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((value, index) => !value && dists[index] < Infinity);
}

/** 
 get the node that has shortest path available and hasn't been visited yet 
*/
function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (dists[i] < lowestDistance) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false);
    const prev: number[] = new Array(arr.length).fill(-1);
    const dists: number[] = new Array(arr.length).fill(Infinity);

    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const lo: number = getLowestUnvisited(seen, dists);
        seen[lo] = true;

        const adjs: GraphEdge[] = arr[lo];

        for (let i = 0; i < adjs.length; ++i) {
            const edge: GraphEdge = adjs[i];

            if (seen[edge.to]) {
                continue;
            }

            const dist: number = dists[lo] + edge.weight;

            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = lo;
            }
        }
    }

    let curr: number = sink;
    const out: number[] = [];
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);

    return out.reverse();
}
