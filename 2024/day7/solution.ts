import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

const part1 = (data: string) => {
  const lines = parseInput(data);

  console.log(lines)

  return -1;
};


const part2 = (data: string) => {
  const lines = parseInput(data);

  return -1;
};

export const solve: Solution = (source) => {
  title("Day 7: x");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
