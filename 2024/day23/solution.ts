import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  return -1;
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 23: x");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
