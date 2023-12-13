
import { Solution, readInput, title, withTime } from "../../common/types";

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
  return 0;
}

const transpose = (m: string[][]) => m[0].map((_, i) => m.map((x) => x[i]));

let caclulateScore = (data: string, diff = 0) => {
  let clusters: string[][][] = parseData(data);

  let total = 0;
  for (let cluster of clusters) {
    let leftCols = findSymmetricsCenter(cluster, diff);  
    if (leftCols > -1) {
      total += (leftCols * 100);
    }

    let topRows = findSymmetricsCenter(transpose(cluster), diff);
    if (topRows > -1) {
      total += topRows;
    }
  }
  return total;
} 

const part1 = (data: string) => {
  return caclulateScore(data, 0);
}

const part2 = (data: string) => {
  return caclulateScore(data, 1);
}

export const solve: Solution = (source) => {
  title("Day 13: Point of Incidence");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
