
import { Solution, readInput, title, withTime } from "../../common/types";

const getLines = (data: string) => data.split("\n")
// .map(items => items.split("\n")
// .map(Number)
// .reduce((a, b) => a + b), 0);

const part1 = (data: string) => {
  const lines = getLines(data);

  return 0;
}

const part2 = (data: string) => {
  const lines = getLines(data);

  return 0;
}

export const solve: Solution = (source) => {
  title("Day 1: xxx");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
