import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let [init, ops] = data.split("\n\n");
  return -1;
};

const part2 = (data: string) => {
  let [init, ops] = data.split("\n\n");
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 25: x");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
