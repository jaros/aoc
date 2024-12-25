import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let schemas: string[][][] = data.split("\n\n").map(schema => schema.split("\n").map(line => line.split("")));
  let locks: number[][] = [];
  let keys: number[][] = [];
  const HEIGHT = schemas[0].length; 

  let transpose = (pattern: string[][]): string[][] => pattern[0].map((_val, colIdx) => pattern.map(row => row[colIdx]));

  let pinsCounts = (pins: string[]) => pins.filter(p => p == "#").length - 1

  let isOverlap = (lock: number[]) => (key: number[]) => lock.every((pin, i) => pin + key[i] < HEIGHT - 1);

  for (let sch of schemas) {
    const heights = transpose(sch).map(pinsCounts)
    if (sch[0][0] == "#") {
      locks.push(heights);
    } else {
      keys.push(heights);
    }
  }

  return locks.flatMap(lock => keys.filter(isOverlap(lock)).length).reduce(sum);
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 25: Code Chronicle");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
