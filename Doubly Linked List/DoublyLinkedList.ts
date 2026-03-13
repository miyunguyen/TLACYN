type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;

        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("You can't do that");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;

        const curr = this.getAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;
        const prev = curr.prev as Node<T>;

        node.next = curr;
        curr.prev = node;

        if (prev) {
            node.prev = prev;
            prev.next = node;
        }
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        const node = this.getNode(item);

        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }

    private getNode(item: T): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value == item) {
                break;
            }
            curr = curr.next;
        }

        return curr;
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const val = this.head?.value;
            this.head = this.tail = undefined;
            return val;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node == this.head) {
            const out = this.head;
            this.head = this.head.next;
            return out.value;
        }

        if (node == this.tail) {
            const out = this.tail;
            this.tail = this.tail.prev;
            return out.value;
        }

        node.next = node.prev = undefined;
        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}
