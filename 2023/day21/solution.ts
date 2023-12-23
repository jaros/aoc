import { Solution, readInput, title, withTime } from "../../common/types";

let encode = ([r, c]: number[]) => `${r},${c}`;

const part1 = (data: string) => {
  const grid = data.split('\n').map(r => r.split(''));

  let start = grid.reduce((prev, row, rIdx) => prev[1] != -1 ? prev : [rIdx, row.findIndex(c => c == 'S')], [-1, -1]);
  console.log(start)

  let ans = new Set();
  let seen = new Set([encode(start)]);
  let q = [[...start, 64]];
  
  while (q.length > 0) {
    let [r, c, s] = q.shift()!;
    if (s % 2 == 0) {
      ans.add(encode([r, c]))
    }
    if (s == 0) {
      continue;
    }
    for (let [nr, nc] of [[r+1, c], [r-1,c], [r, c+1], [r, c-1]]) {
      let nKey = encode([nr, nc]);
      if (nr < 0 || nr > grid.length || nc < 0 || nc > grid[0].length || grid[nr][nc] == '#' || seen.has(nKey)) {
        continue;
      }
      seen.add(nKey);
      q.push([nr, nc, s-1]);
    }
  }
  return ans.size;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 21: Step Counter");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
