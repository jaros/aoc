import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const SIZE = 71; // 7
const LIMIT = 1024; // 12;

const toKey = (x: number, y: number) => `${x},${y}`;

type Position = [number, number];

let printGrid = (grid: string[][]) => {
  console.log(grid.map((r) => r.join("")).join("\n"));
};
const part1 = (data: string) => {
  let bytes = data.split("\n").map((line) => line.split(",").map(Number));
  let grid: string[][] = [];
  for (let y = 0; y < SIZE; y++) {
    let row = [];
    for (let x = 0; x < SIZE; x++) {
      row.push(".");
    }
    grid.push(row);
  }
  // printGrid(grid);

  for (let i = 0; i < LIMIT; i++) {
    let [x, y] = bytes[i];
    grid[y][x] = "#";
  }

  const dirs: Position[] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  let stack: number[][] = [[0, 0, 0]]; // r, c, d
  let seen = new Set([toKey(0, 0)]);
  while (stack.length > 0) {
    let [r, c, d] = stack.shift()!;
    for (let [dr, dc] of dirs) {
      let nr = r + dr;
      let nc = c + dc;

      if (
        nr >= 0 &&
        nr < SIZE &&
        nc >= 0 &&
        nc < SIZE &&
        grid[nr][nc] != "#" &&
        !seen.has(toKey(nr, nc))
      ) {
        if (nr == SIZE - 1 && nc == SIZE - 1) {
          return d + 1;
        }
        seen.add(toKey(nr, nc));
        stack.push([nr, nc, d + 1]);
      }
    }
  }
};

const part2 = (data: string) => {
  let ans = 0;
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 18: RAM Run");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
