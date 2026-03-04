import Node from "./Node";

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = new Node(item);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) return;
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }

        const nextNode = this.getNodeAt(idx);
        if (!nextNode) return;
        const prevNode = nextNode.prev;
        const node = new Node(item, prevNode, nextNode);
        if (prevNode) prevNode.next = node;
        nextNode.prev = node;
        this.length++;
    }

    append(item: T): void {
        const node = new Node(item);
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }

    get(idx: number): T | undefined {
        return this.getNodeAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        const node = this.getNodeAt(idx);
        if (!node) return undefined;
        const val = node.value;
        this.unlink(node);
        return val;
    }

    private unlink(node: Node<T>): void {
        const { prev, next } = node;
        if (prev) prev.next = next;
        else this.head = next;
        if (next) next.prev = prev;
        else this.tail = prev;
        node.next = undefined;
        node.prev = undefined;
        this.length--;
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        // choose direction for faster traversal
        if (idx <= this.length / 2) {
            let cur = this.head;
            for (let i = 0; i < idx && cur; i++) cur = cur.next;
            return cur;
        } else {
            let cur = this.tail;
            for (let i = this.length - 1; i > idx && cur; i--) cur = cur.prev;
            return cur;
        }
    }
}
