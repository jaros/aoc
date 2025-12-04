import { Solution, readInput, title, withTime } from "../../common/types";

const getGrid = (data: string) =>
  data.split("\n").map((line) => line.split(""));

const adjLimit = 4;

const adjacentDeltas = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

const findForkliftsRemovable = (grid: string[][]): [number, number][] => {
  const toRemove: [number, number][] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell === ".") continue;

      let occupiedCount = 0;
      for (const [dRow, dCol] of adjacentDeltas) {
        const nRow = row + dRow;
        const nCol = col + dCol;
        if (
          nRow < 0 ||
          nRow >= grid.length ||
          nCol < 0 ||
          nCol >= grid[row].length
        ) {
          continue;
        }
        if (grid[nRow][nCol] === "@") {
          occupiedCount++;
        }
      }

      if (occupiedCount < adjLimit) {
        toRemove.push([row, col]);
      }
    }
  }
  return toRemove;
};

const part1 = (data: string) => {
  const grid = getGrid(data);
  // console.log(grid);
  return findForkliftsRemovable(grid).length;
};

const part2 = (data: string) => {
  const grid = getGrid(data);
  let ans = 0;

  let removed = 0;
  do {
    removed = 0;
    findForkliftsRemovable(grid).forEach(([row, col]) => {
      grid[row][col] = ".";
      removed++;
    });
    ans += removed;
  } while (removed > 0);
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 4: Printing Department");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
