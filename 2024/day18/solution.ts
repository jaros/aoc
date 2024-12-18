import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const SIZE = 71; // 7
const LIMIT = 1024; // 12;

const toKey = (x: number, y: number) => `${x},${y}`;

type Position = [number, number];

let printGrid = (grid: string[][]) => {
  console.log(grid.map((r) => r.join("")).join("\n"));
};

const dirs: Position[] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const initGrid = (coords: number[][], limit: number): string[][] => {
  let grid: string[][] = [];
  for (let y = 0; y < SIZE; y++) {
    let row = [];
    for (let x = 0; x < SIZE; x++) {
      row.push(".");
    }
    grid.push(row);
  }

  for (let i = 0; i < limit; i++) {
    let [x, y] = coords[i];
    grid[y][x] = "#";
  }
  return grid;
};

const part1 = (data: string) => {
  const coords = data.split("\n").map((line) => line.split(",").map(Number));

  const grid = initGrid(coords, LIMIT);

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
  const coords = data.split("\n").map((line) => line.split(",").map(Number));

  const hasPath = (n: number): boolean => {
    const grid = initGrid(coords, n);

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
            return true;
          }
          seen.add(toKey(nr, nc));
          stack.push([nr, nc, d + 1]);
        }
      }
    }
    return false;
  };

  let l = 0;
  let r = coords.length - 1;

  while (l < r) {
    let mid = Math.floor(l + r) / 2;
    if (hasPath(mid + 1)) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return coords[l];
};

export const solve: Solution = (source) => {
  title("Day 18: RAM Run");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
