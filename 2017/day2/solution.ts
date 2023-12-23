
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let digits = data.split('\n').map(row => row.split(/[  |\t]/).map(Number));
  return digits.map(row => Math.max(...row) - Math.min(...row)).reduce(sum);
}

const part2 = (data: string) => {
  let digits = data.split('\n').map(row => row.split(/[  |\t]/).map(Number));
  let total = 0;
  for (let row of digits) {
    row.sort((a, b) => b - a)
    for (let i = 0; i < row.length; i++) {
      for (let j = i + 1; j < row.length; j++) {
        if (row[i] % row[j] == 0) {
          total += row[i] / row[j]
        }
      }
    }
  }
  return total;
}

export const solve: Solution = (source) => {
  title("Day 1: Corruption Checksum");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
