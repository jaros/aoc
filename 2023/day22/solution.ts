import { Solution, readInput, title, withTime } from "../../common/types";


const moveBricksAndMapTouchAreas = (data: string): { // key supports value
    bricks: number[][],
    k_supports_v: Array<Set<number>>,
    v_supports_k: Array<Set<number>>
} => {
  let bricks: number[][] = data.split('\n').map(line => line.replace('~', ',').split(',').map(Number));
  
  bricks.sort((a, b) => a[2] - b[2]);

  let overlaps = (a: number[], b: number[]) => {
    return Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  }

  for (let i=0; i < bricks.length; i++) {
    let max_z = 1
    let brick = bricks[i]
    for(let j=0; j < i; j++ ) {
      let check = bricks[j]
      if (overlaps(brick, check)) {
        max_z = Math.max(max_z, check[5] + 1)
      }
    }
    brick[5] -= brick[2] - max_z
    brick[2] = max_z
  }

  bricks.sort((a, b) => a[2] - b[2]);

  let k_supports_v: Array<Set<number>> = [];
  let v_supports_k: Array<Set<number>> = [];

  for (let i=0; i < bricks.length; i++) {
    k_supports_v[i] = new Set();
    v_supports_k[i] = new Set();
  }

  for (let j=0; j < bricks.length; j++) {
    let upper = bricks[j];
    for (let i=0; i < j; i++) {
      let lower = bricks[i];
      if (overlaps(lower, upper) && upper[2] == lower[5] + 1) {
        k_supports_v[i].add(j);
        v_supports_k[j].add(i);
      }
    }
  }
  return {
    bricks,
    k_supports_v,
    v_supports_k
  }
};

const part1 = (data: string) => {
  let {bricks, k_supports_v, v_supports_k} = moveBricksAndMapTouchAreas(data);

  let total = 0;
  for (let i=0; i < bricks.length; i++) {
    let hasMoreThanOneSupporter = [...k_supports_v[i]].every(j => v_supports_k[j].size >= 2)
    if (hasMoreThanOneSupporter) {
      total++;
    }
  }

  return total;
};

const part2 = (data: string) => {
  let {bricks, k_supports_v, v_supports_k} = moveBricksAndMapTouchAreas(data);

  let total = 0;
  for (let i=0; i < bricks.length; i++) {
   let q = [...k_supports_v[i]].filter(j => v_supports_k[j].size == 1);
   let falling = new Set(q);
   falling.add(i)
   
    while (q.length > 0) {
      let j = q.shift()!;
      for (let k of k_supports_v[j]) {
        if (!falling.has(k) && [...v_supports_k[k]].every(under => falling.has(under))) {
          q.push(k);
          falling.add(k)
        }
      }
    }
    total += (falling.size - 1)
  }

  return total;
};

export const solve: Solution = (source) => {
  title("Day 22: Sand Slabs");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
