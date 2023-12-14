
import { Solution, readInput, title, withTime } from "../../common/types";
import { count } from "../utils";

const parseData = (data: string): string[] => {
  return data.split('\n');
}

const transpose = (lines: string[]): string[] => lines[0].split('').map((_, i) => lines.map((x) => x[i]).join(''));

let moveStones = (row: string): string => row
      .split('#')
      .map(group => group.split('').sort().reverse().join(''))
      .join('#')

let countWeight = (grid: string[]) => grid
  .map((row, i) => count(row, 'O') * (grid.length - i))
  .reduce((a, b) => a + b, 0);

const part1 = (data: string) => {
  let m = parseData(data);
  let cols = transpose(m);
  let moved = cols.map(moveStones);
  let originalView = transpose(moved);
  return countWeight(originalView);
}

let cycle = (grid: string[]) => {
  for (let i = 0; i < 4; i++) {
    grid = transpose(grid);
    grid = grid.map(moveStones);
    grid = grid.map((row) => row.split("").reverse().join(""));
  }
  return grid;
}

const part2 = (data: string) => {
  let grid = parseData(data);
  let key: string = grid.join('-');
  let seen = new Set([key]);
  let arr = [key];

  let i = 0;
  while (true) {
    i++;
    grid = cycle(grid);
    key = grid.join('-');
    if (seen.has(key)) {
      break;
    }
    seen.add(key);
    arr.push(key);
  }

  let begin = arr.indexOf(key);
  grid = arr[(1000000000 - begin) % (i - begin) + begin].split('-');
  return countWeight(grid);
}

export const solve: Solution = (source) => {
  title("Day 14: Parabolic Reflector Dish");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
