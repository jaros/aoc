
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Row = {
  records: string;
  groups: number[];
}

const parseData = (data: string): string[][][] => {
  return data.split('\n\n').map(c => c.split('\n').map(r => r.split('')));
}

let findSymmetricsCenter = (grid: string[][], diff = 0) => {
  let len = grid.length;
  let l = 0;
  while (l < len-1) {
    let k = 0;
    let d = 0;
    while (l-k >= 0 && l+k+1 < len) {
      let left = grid[l-k];
      let right = grid[l+k+1];
      for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) {
          d++;
        }
      }
      k++;
    }
    if (d == diff) {
      return l + 1;
    }
    l++;
  }
  return -1;
}

const transpose = (m: string[][]) => m[0].map((_, i) => m.map((x) => x[i]));

const part1 = (data: string) => {
  let clusters: string[][][] = parseData(data);

  let total = 0;
  for (let cluster of clusters) {
    let leftCols = findSymmetricsCenter(cluster);  
    if (leftCols > -1) {
      total += (leftCols * 100);
    }

    let topRows = findSymmetricsCenter(transpose(cluster));
    if (topRows > -1) {
      total += topRows;
    }
  }
  return total;
}

const findReflection = (grid: string[][], diff: number) => {
  let len = grid.length;
  let l = 0;

  while (l < len - 1) {
    let d = 0;
    let k = 0;

    while (k < len) {
      let left = grid[k];
      let tI = 2*l - k + 1 ;
      if (tI >= 0 && tI < len) {
        let right = grid[tI];
        for (let i = 0; i < left.length; i++) {
          if (left[i] !== right[i]) {
            d++;
          }
        }
      }
      k++;
    }
    if (d === diff) {
      return l + 1;
    }
    l++;
  }
  return 0;
};

const findScore = (grid: string[][], diff: number) => {
  const row = findReflection(grid, diff);
  const col = findReflection(transpose(grid), diff);
  return row ? 100 * row : col;
};

const part2 = (data: string) => {
  let clusters = parseData(data);
  let total = 0;
  for (let cluster of clusters) {
    total += findScore(cluster, 2);
  }
  return total;
}

export const solve: Solution = (source) => {
  title("Day 13: Point of Incidence");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
