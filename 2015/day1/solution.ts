
import { Solution, readInput, title, withTime } from "../../common/types";

const mapChar = (c: string) => c == '(' ? 1 : -1;

const part1 = (data: string) => {
  return data.split('').reduce((acc, cur) => acc + mapChar(cur), 0);
};

const part2 = (data: string) => {
  let floor = 0;
  return data.split('').findIndex(c => (floor += mapChar(c)) < 0) + 1;
};

export const solve: Solution = (source) => {
  title("Day 1: Not Quite Lisp");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
