import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

type Grid = number[][];
type Position = { row: number; col: number };

const directions = [
  { row: -1, col: 0 }, // Up
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
  { row: 0, col: 1 }, // Right
];

const toStr = ({row, col}: Position) => `${row},${col}`

let findHeads = (grid: number[][]): Position[] => {
  let heads: Position[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] == 0) {
        heads.push({ row, col });
      }
    }
  }
  return heads;
};

const findAllWaysToTops = (data: string) => {
  const grid = parseInput(data).map((line) => line.split("").map(Number));
  
  const isValid = (pos: Position): boolean => {
    return pos.row >= 0 && pos.row < grid.length && pos.col >= 0 && pos.col < grid[0].length;
  }

  const backtrack = (pos: Position, currentValue: number): Position[] => {
    if (!isValid(pos) || grid[pos.row][pos.col] < currentValue) {
      return [];
    }
  
    if (grid[pos.row][pos.col] === 9) {
      return [{row: pos.row, col: pos.col}]; // Found a valid way to reach 9
    }
  
    const originalValue = grid[pos.row][pos.col];
    grid[pos.row][pos.col] = -100; // Mark as visited to prevent revisiting
  
    let ways = [];
  
    for (const direction of directions) {
      const nextPos = {
        row: pos.row + direction.row,
        col: pos.col + direction.col,
      };
      if (isValid(nextPos)) {
        const nextValue = grid[nextPos.row][nextPos.col];
        if (nextValue === currentValue + 1) {
          // ways += backtrack(nextPos, nextValue);
          ways.push(...backtrack(nextPos, nextValue));
        }
      }
    }
  
    grid[pos.row][pos.col] = originalValue; // Restore the grid state
    return ways;
  };

  return findHeads(grid).map(head => backtrack({ ...head }, 0));
}

const part1 = (data: string) => {
  let ways = findAllWaysToTops(data);
  let sets = ways.map(w => new Set(w.map(toStr)));
  return sets.map(s => s.size).reduce(sum);
};

const part2 = (data: string) => {
  let ways = findAllWaysToTops(data);
  return ways.map(s => s.length).reduce(sum);
};

export const solve: Solution = (source) => {
  title("Day 10: Hoof It");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
