
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  return 0;
}

const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 6: ");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
