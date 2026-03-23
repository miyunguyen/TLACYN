// Implemented by AI
// A single Trie node:
// - children: links to next letters
// - isWord: true if a full word ends at this node
type TrieNode = {
    children: Map<string, TrieNode>;
    isWord: boolean;
};

export default class Trie {
    // Root is the starting node (it does not store a letter itself)
    private root: TrieNode;

    constructor() {
        this.root = this.createNode();
    }

    // Add a word letter by letter
    insert(item: string): void {
        let curr = this.root;

        for (const ch of item) {
            let next = curr.children.get(ch);
            if (!next) {
                next = this.createNode();
                curr.children.set(ch, next);
            }
            curr = next;
        }

        // Mark the final node as a complete word
        curr.isWord = true;
    }

    // Remove a word and clean up unused nodes
    delete(item: string): void {
        const path: Array<[TrieNode, string]> = [];
        let curr = this.root;

        for (const ch of item) {
            const next = curr.children.get(ch);
            if (!next) {
                return; // Word not found
            }
            path.push([curr, ch]);
            curr = next;
        }

        if (!curr.isWord) {
            return; // Prefix exists, but not a complete word
        }

        // Unmark the word end
        curr.isWord = false;

        // Delete nodes from back to front if they are no longer needed
        for (let i = path.length - 1; i >= 0; --i) {
            const [parent, ch] = path[i];
            const node = parent.children.get(ch);

            if (!node) {
                continue;
            }

            // Stop if node is still used by another word
            if (node.isWord || node.children.size > 0) {
                break;
            }

            parent.children.delete(ch);
        }
    }

    // Find all words that start with the given prefix
    find(partial: string): string[] {
        let curr = this.root;

        // Move to the node that matches the prefix
        for (const ch of partial) {
            const next = curr.children.get(ch);
            if (!next) {
                return []; // Prefix not found
            }
            curr = next;
        }

        // Collect all words below that prefix node
        const out: string[] = [];
        this.collect(curr, partial, out);
        return out;
    }

    // Helper: create an empty node
    private createNode(): TrieNode {
        return {
            children: new Map<string, TrieNode>(),
            isWord: false,
        };
    }

    // Helper: DFS to gather all words under a node
    private collect(node: TrieNode, prefix: string, out: string[]): void {
        if (node.isWord) {
            out.push(prefix);
        }

        for (const [ch, child] of node.children) {
            this.collect(child, prefix + ch, out);
        }
    }
}
