export default class MinHeap {
    public length: number;
    public data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number | undefined {
        if (this.length === 0) {
            return undefined;
        }

        const out = this.data[0];

        if (this.length === 1) {
            this.data = [];
            this.length--;
            return out;
        }

        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        // current Idx has no child
        if (lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (rV < lV && rV < v) {
            this.data[rIdx] = v;
            this.data[idx] = rV;
            this.heapifyDown(rIdx);
        } else if (rV >= lV && lV < v) {
            this.data[lIdx] = v;
            this.data[idx] = lV;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const v = this.data[idx];
        const pV = this.data[parentIdx];

        if (v < pV) {
            this.data[idx] = pV;
            this.data[parentIdx] = v;
            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
