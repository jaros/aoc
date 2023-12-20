export const min = (a: number, b: number) => Math.min(a, b);

export const sum = (a: number, b: number) => a + b;

export const multiply = (a: number, b: number) => a * b;

export const count = (line: string, char: string): number => line.split('').filter(c => c == char).length;

export class PriorityQueue {
    private heap: number[][];
    constructor() {
        this.heap = [];
      }
    
      push(item: number[]) {
        this.heap.push(item);
        this.heapifyUp();
      }
    
      pop() {
        if (this.isEmpty()) return null;
        const root = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
          this.heap[0] = last!;
          this.heapifyDown();
        }
        return root;
      }
    
      isEmpty() {
        return this.heap.length === 0;
      }
    
      heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
          const parentIndex = Math.floor((currentIndex - 1) / 2);
          if (this.heap[currentIndex][0] < this.heap[parentIndex][0]) {
            [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
            currentIndex = parentIndex;
          } else {
            break;
          }
        }
      }
    
      heapifyDown() {
        let currentIndex = 0;
        const length = this.heap.length;
        const currentElement = this.heap[0];
    
        while (true) {
          let leftChildIndex = 2 * currentIndex + 1;
          let rightChildIndex = 2 * currentIndex + 2;
          let leftChild, rightChild;
          let swapIndex = null;
    
          if (leftChildIndex < length) {
            leftChild = this.heap[leftChildIndex];
            if (leftChild[0] < currentElement[0]) {
              swapIndex = leftChildIndex;
            }
          }
    
          if (rightChildIndex < length) {
            rightChild = this.heap[rightChildIndex];
            if ((swapIndex === null && rightChild[0] < currentElement[0]) ||
                (swapIndex !== null && rightChild[0] < leftChild![0])) {
              swapIndex = rightChildIndex;
            }
          }
    
          if (swapIndex === null) break;
    
          this.heap[currentIndex] = this.heap[swapIndex];
          this.heap[swapIndex] = currentElement;
          currentIndex = swapIndex;
        }
      }
  }

  export const gcd = (a: number, b: number): number => {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
  }