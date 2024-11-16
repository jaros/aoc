
import { Solution, readInput, title, withTime } from "../../common/types";


const parseInput = (data: string): string[] => data.split("\n");

const countTreesWithFactors = (map: string[], dCol: number, dRow: number): number => {
  let count = 0;
  let col = 0;
  let row = 0;
  let w = map[0].length;
  while (row < map.length) {
    let point = map[row][col % w];
    if (point == '#') {
      count++;
    }
    row += dRow;
    col += dCol;
  }
  return count;
} 

const part1 = (data: string) => {
  let lines = parseInput(data);
  return countTreesWithFactors(lines, 3, 1);
};

const part2 = (data: string) => {
  let lines = parseInput(data);
  return countTreesWithFactors(lines, 1, 1)
    * countTreesWithFactors(lines, 3, 1)
    * countTreesWithFactors(lines, 5, 1)
    * countTreesWithFactors(lines, 7, 1)
    * countTreesWithFactors(lines, 1, 2);
};

export const solve: Solution = (source) => {
  title("Day 3: Toboggan Trajectory");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
