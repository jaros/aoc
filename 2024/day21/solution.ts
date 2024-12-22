import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let codes = data.split("\n");
  let nums = codes.map(s => Number(s.slice(0, s.length-1)));
  console.log(codes)
  console.log(nums)

  

  return -1;
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 21: Keypad Conundrum");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
