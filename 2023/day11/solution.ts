
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

const parseInput = (data: string) : number[][] => {
  return data.split("\n").map(line => line.split(" ").map(Number));
}


const part1 = (data: string) => {
  return 0;
}

const part2 = (data: string) => {
  return 0;
}


export const solve: Solution = (source) => {
  title("Day 11: ");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
