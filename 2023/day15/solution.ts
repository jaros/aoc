
import { Solution, readInput, title, withTime } from "../../common/types";

const parseData = (data: string): string[] => {
  return data.split('\n');
}

const part1 = (data: string) => {
  return 0;
}

const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 15: XXX");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
