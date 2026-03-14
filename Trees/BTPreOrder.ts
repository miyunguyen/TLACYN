function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }

    // pre
    path.push(curr.value);
    // recurse

    traverse(curr.left, path);
    traverse(curr.right, path);
    // post

    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}
