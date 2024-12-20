import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

let findStart = (grid: string[][]): [number, number] => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] == "S") {
        return [r, c];
      }
    }
  }
  return [-1, -1];
};

const part1 = (data: string) => {
  let grid = data.split("\n").map(line => line.split(""));
  let [sr, sc] = findStart(grid);

  let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  let key = (r: number, c: number) => `${r},${c}`;

  let findPath = (): number[] => {
    let q: number[][] = [[sr, sc, 0]];
    let seen: Set<string> = new Set<string>([key(sr, sc)]);
    let passes = [];
    while (q.length > 0) {
      let [r,c, steps] = q.shift()!;
      if (grid[r][c] == "E") {
        passes.push(steps);
      }
      seen.add(key(r, c));
      for (let [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;
        if (seen.has(key(nr, nc))) {
          continue;
        }
        if (grid[nr][nc] == "#") {
          // if (cheat > 0) {
          //   continue;
          // } else if (cheat == 0 && nr > 0 && nc < grid.length-1 && nc > 0 && nc < grid[0].length-1) {
          //   q.push([nr, nc, steps + 1, cheat+1]);
          //   // q.push([nr, nc, steps + 1, cheat]);
          // }
        } else {
          q.push([nr, nc, steps + 1]);
        }
      }
    }
    return passes;
  }

  const originSteps = findPath()[0];

  const ways = [];

  for (let r = 1; r < grid.length-1; r++) {
    for (let c = 1; c < grid[0].length-1; c++) {
      if (grid[r][c] == "#") {
        grid[r][c] = ".";
        ways.push(...findPath())
        grid[r][c] = "#";
      }
    }
  }

  console.log(originSteps)
  let diffs = ways.map(len => originSteps - len);
  diffs.sort((a, b) => b-a)
  let bestDiffs = diffs.filter(diff => diff >= 100).length;
  return bestDiffs;
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 20: Race Condition");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
