function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }

    traverse(curr.left, path);
    path.push(curr.value);
    traverse(curr.right, path);

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}
