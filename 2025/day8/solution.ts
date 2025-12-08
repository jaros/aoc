import { e, number, re, to } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Distance = {len: number, x: number, y: number};

class UnionFind {
    public parent: Array<number>;
    constructor(size: number) {
    
        // Initialize the parent array with each 
        // element as its own representative
        this.parent = Array.from({ length: size }, (_, i) => i);
    }

    public find(i: number): number {
    
        // If i itself is root or representative
        if (this.parent[i] === i) {
            return i;
        }
        
        // Else recursively find the representative 
        // of the parent
        return this.find(this.parent[i]);
    }

    public unite(i: number, j: number): void {
    
        // Representative of set containing i
        const irep = this.find(i);
        
        // Representative of set containing j
        const jrep = this.find(j);
        
        // Make the representative of i's set
        // be the representative of j's set
        this.parent[irep] = jrep;
    }
}

const getBoxes = (data: string): number[][] => { //[x,y,z]
  const locations = data.split("\n").map(line => line.split(",").map(Number));
  return locations;
}

const getDistance = (p1: number[], p2: number[]): number => {
  const [x1, y1, z1] = p1;
  const [x2, y2, z2] = p2;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

const part1 = (data: string) => {
  const boxes = getBoxes(data);

  // index is box id
  let allDistances: number[][] = Array.from({length: boxes.length}, () => Array(boxes.length).fill(0));
  for (let i=0; i < boxes.length; i++) {
    for (let j=0; j < boxes.length; j++) {
      allDistances[i][j] = getDistance(boxes[i], boxes[j]);
    }
  }

  const flatOrderedDistances: Distance[] = [];
  for (let i=0; i < allDistances.length; i++) {
    for (let j=i+1; j < allDistances.length; j++) {
      flatOrderedDistances.push({len: allDistances[i][j], x: i, y: j})
    }
  }
  flatOrderedDistances.sort((a,b) => a.len - b.len);
  const uf = new UnionFind(boxes.length);

  const times = boxes.length === 1000 ? 1000 : 10;
  // group Id is the smallest box id => union find
  for (let t=0; t < times; t++) {
    let {x, y} = flatOrderedDistances.shift()!;
    uf.unite(x, y);
  }

  // console.log(uf)

  let groups: Record<number, number> = {};
  for (let i=0; i < boxes.length; i++) {
    let parent = uf.find(i);
    groups[parent] = (groups[parent] ?? 0) + 1
  }
  let sizes = Object.values(groups);
  sizes.sort((a,b) => b-a);

  return sizes[0] * sizes[1] * sizes[2];
};


const part2 = (data: string) => {
  const boxes = getBoxes(data);

  // index is box id
  let allDistances: number[][] = Array.from({length: boxes.length}, () => Array(boxes.length).fill(0));
  for (let i=0; i < boxes.length; i++) {
    for (let j=0; j < boxes.length; j++) {
      allDistances[i][j] = getDistance(boxes[i], boxes[j]);
    }
  }

  const flatOrderedDistances: Distance[] = [];
  for (let i=0; i < allDistances.length; i++) {
    for (let j=i+1; j < allDistances.length; j++) {
      flatOrderedDistances.push({len: allDistances[i][j], x: i, y: j})
    }
  }
  flatOrderedDistances.sort((a,b) => a.len - b.len);
  const uf = new UnionFind(boxes.length);

  // group Id is the smallest box id => union find
  // let connectedBoxesGroups = [];
  let disconnectedGroups: Set<number> = new Set();
  for (let i=0; i < boxes.length; i++) {
    disconnectedGroups.add(i);
  }

  
  // do it until 1 group remain
  let b1: number[] = [];
  let b2: number[] = [];
  let counter = 0;
  while (disconnectedGroups.size > 1) {
    let {x, y, len} = flatOrderedDistances.shift()!;
    // console.log("join", {x, y, len})
    
    // merged into group
    disconnectedGroups.delete(uf.find(x))
    disconnectedGroups.delete(uf.find(y))
    uf.unite(x, y);
    
    disconnectedGroups.add(uf.find(x));
    counter++;
    
    b1 = boxes[x]
    b2 = boxes[y]

    // console.log("connecting", x, y, boxes[x], boxes[y])
  }
  return b1[0] * b2[0];
};

export const solve: Solution = (source) => {
  title("Day 8: Playground");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
