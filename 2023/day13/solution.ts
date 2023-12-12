
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Row = {
  records: string;
  groups: number[];
}

const parseData = (data: string): string[] => {
  return data.split('\n');
}

const part1 = (data: string) => {
  let lines = parseData(data);
  return lines.length;
}

// 7716 - ok
const part2 = (data: string) => {
  let lines = parseData(data);
  return lines.length;
}


export const solve: Solution = (source) => {
  title("Day 13: XXX");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
