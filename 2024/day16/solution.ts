import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Pos = [number, number];

let findCell = (grid: string[][], val: string): Pos => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] == val) {
        return [r, c];
      }
    }
  }
  return [-1, -1];
};

const toKeyDir = ([r, c]: Pos, [dr, dc]: Pos): string => `${r},${c},${dr},${dc}`;

type Deer = { 
  pos: Pos; 
  dir: Pos; 
  score: number; 
  // path: Set<string> 
};

const part1 = (data: string) => {
  let grid = data.split("\n").map((line) => line.split(""));

  let deerPos = findCell(grid, "S");

  let minScore = Number.MAX_SAFE_INTEGER;
  let stack: Array<Deer> = [
    {
      pos: deerPos,
      dir: [0, 1],
      score: 0
    },
  ];
  let seen = new Set([toKeyDir(deerPos, [0, 1])]);

  while (stack.length > 0) {
    let { pos, dir, score } = stack.shift()!;
    let [r, c] = pos;
    let [dr, dc] = dir;

    const keyDir = toKeyDir(pos, dir);
    seen.add(keyDir);

    if (grid[r][c] == "E") {
      minScore = Math.min(minScore, score);
      // console.log(score)
      // break;
      // continue;
    }

    let vars: Deer[] = [
      {score: score + 1,    pos: [r + dr, c + dc], dir: [dr, dc]}, 
      {score: score + 1000, pos: [r, c],           dir: [dc,  -dr]}, 
      {score: score + 1000, pos: [r, c],           dir: [-dc,  dr]}]; 

    for (let {score: nScore, pos: nPos, dir: nDir} of vars) {
      let [nr, nc] = nPos;
      if (grid[nr][nc] == "#") {
        continue;
      }
      if (seen.has(toKeyDir(nPos, nDir))) {
        continue;
      }

      stack.push({
        score: nScore,
        pos: nPos,
        dir: nDir
      });
    }
  }
  return minScore;
};

// 110432 - too high

const part2 = (data: string) => {
  let ans = 0;
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 16: ");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
