import { e, re } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";


const getLines = (data: string): string[] => {
  const lines = data.split("\n");
  return lines;
}

const part1 = (data: string) => {
  getLines(data);
  return 0;
};

const part2 = (data: string) => {
  getLines(data);
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 7: ");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
