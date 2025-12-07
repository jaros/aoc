import { e, number, re, to } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";


const getLines = (data: string): [number, string[]] => {
  const lines = data.split("\n");
  let startIdx = lines[0].indexOf("S");
  return [startIdx, lines];
}

const part1 = (data: string) => {
  const [startIdx, grid] = getLines(data);

  let splitTimes = 0;
  let beams = new Set([startIdx]);
  for (let row = 1; row < grid.length; row++) {
    const newBeams: Set<number> = new Set<number>();
    for (const beam of beams) {
        // console.log("grid[row][beam]", grid[row][beam]);
      if (grid[row][beam] === ".") {
        newBeams.add(beam);
      } else if (grid[row][beam] === "^") {
        if (beam > 0) {
          newBeams.add(beam - 1);
        }
        if (beam < grid[0].length - 1) {
          newBeams.add(beam + 1);
        }
        splitTimes++;
      }
    }
    beams = newBeams;
  }
  return splitTimes;
};


const countWays = (grid: string[], row: number, col: number, cache: number[][]): number => {
  if (row >= grid.length || col < 0 || col >= grid[0].length ) {
    return 1;
  }
  if (cache[row][col] !== -1) {
    return cache[row][col];
  }
  if (grid[row][col] === ".") {
    const ways = countWays(grid, row + 1, col, cache);
    cache[row][col] = ways;
    return ways;
  } else if (grid[row][col] === "^") {
    const ways = countWays(grid, row + 1, col - 1, cache) + countWays(grid, row + 1, col + 1, cache);
    cache[row][col] = ways;
    return ways;
  }
  return 0;
};

const part2 = (data: string) => {
  const [startIdx, grid] = getLines(data);
  const cache = Array.from({length: grid.length}, () => Array<number>(grid[0].length).fill(-1));
  return countWays(grid, 1, startIdx, cache);
};

export const solve: Solution = (source) => {
  title("Day 7: Laboratories");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
