function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }

    traverse(curr.left, path);
    traverse(curr.right, path);

    path.push(curr.value);

    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}
