import { e, number, re, to } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Distance = {len: number, x: number, y: number};

class UnionFind {
    public parent: Array<number>;
    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
    }

    public find(i: number): number {
        // If i itself is parent
        if (this.parent[i] === i) {
            return i;
        }
        // Else recursively find the parent 
        // update ref for speedup
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    public unite(i: number, j: number): void {
        this.parent[this.find(i)] = this.find(j);
    }
}

const getBoxes = (data: string): number[][] => { //[x,y,z]
  const locations = data.split("\n").map(line => line.split(",").map(Number));
  return locations;
}

const getDistance = ([x1, y1, z1]: number[], [x2, y2, z2]: number[]): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

const parse = (data: string): {boxes: number[][], flatOrderedDistances: Distance[]} => {
  const boxes = getBoxes(data);

  // index is box id
  const flatOrderedDistances: Distance[] = [];
  for (let i=0; i < boxes.length; i++) {
    for (let j=i+1; j < boxes.length; j++) {
      flatOrderedDistances.push({len: getDistance(boxes[i], boxes[j]), x: i, y: j})
    }
  }
  flatOrderedDistances.sort((a,b) => a.len - b.len);
  return {boxes, flatOrderedDistances};
}

const part1 = (data: string) => {
  const {boxes, flatOrderedDistances} = parse(data);

  const isTest = boxes.length != 1000;
  const times = isTest ? 10 : 1000;
  const uf = new UnionFind(boxes.length);
  for (let t=0; t < times; t++) {
    let {x, y} = flatOrderedDistances.shift()!;
    uf.unite(x, y);
  }

  const groupSizes = uf.parent.map((id) => uf.find(id)).reduce((acc, p) => ({
    ...acc,
    [p]: (acc[p] ?? 0) + 1
  }), {} as Record<number, number>);

  let sizes = Object.values(groupSizes);
  sizes.sort((a,b) => b-a);

  return sizes[0] * sizes[1] * sizes[2];
};


const part2 = (data: string) => {
  const {boxes, flatOrderedDistances} = parse(data);

  let groups: Set<number> = new Set();
  for (let i=0; i < boxes.length; i++) {
    groups.add(i);
  }
  
  let b1: number[] = [];
  let b2: number[] = [];
  const uf = new UnionFind(boxes.length);
  while (groups.size > 1) {
    let {x, y} = flatOrderedDistances.shift()!;
    
    groups.delete(uf.find(x))
    groups.delete(uf.find(y))
    uf.unite(x, y);
    
    groups.add(uf.find(x));
    
    b1 = boxes[x]
    b2 = boxes[y]
  }
  return b1[0] * b2[0];
};

export const solve: Solution = (source) => {
  title("Day 8: Playground");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
