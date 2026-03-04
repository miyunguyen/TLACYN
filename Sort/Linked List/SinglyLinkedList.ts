import Node from "./Node";

export default class SinglyLinkedList<T> {
    private head: Node<T> | undefined;
    public length: number;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = new Node(item);
        node.next = this.head;
        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) return;

        if (idx == 0) {
            this.prepend(item);
            return;
        }

        const node = new Node(item);
        const prev = this.getNodeAt(idx - 1);

        if (prev) {
            node.next = prev.next;
            prev.next = node;
            this.length++;
        }
    }

    append(item: T): void {
        this.insertAt(item, this.length);
    }

    get(idx: number): T | undefined {
        return this.getNodeAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;

        let current = this.head;
        if (!current) return undefined;

        if (idx === 0) {
            this.head = current?.next;
            current.next = undefined;
        } else {
            const prev = this.getNodeAt(idx);
            if (prev && prev.next) {
                current = prev.next;
                prev.next = current.next;
                current.next = undefined;
            }
        }
        this.length--;
        return current?.value;
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        let current = this.head;
        for (let i = 0; i < idx && current; i++) {
            current = current.next;
        }
        return current;
    }
}
