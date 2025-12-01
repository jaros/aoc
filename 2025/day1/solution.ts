
import { Solution, readInput, title, withTime } from "../../common/types";

const getLines = (data: string) => data.split("\n")
// .map(items => items.split("\n")
// .map(Number)
// .reduce((a, b) => a + b), 0);

const part1 = (data: string) => {
  const lines = getLines(data);

  let start = 50;

  let zeros = 0
  for (let line of lines) {
    let times = Number(line.substring(1));
    let d = line[0];
    if (d == "R") {
      start = (start + times) % 100;
    } else {
      start = (start - times + 100) % 100;
    }
    if (start == 0) {
      zeros++;
    }
  }
  return zeros;
}

const part2 = (data: string) => {
  const lines = getLines(data);

  let current = 50;

  let zeros = 0
  for (let line of lines) {
    let times = Number(line.substring(1));
    let d = line[0];
    
    const diff = d == "R" ? 1 : -1;

    while(times > 0) {
      current += diff;
      if (current == -1) {
        current = 99;
      }
      if (current == 100) {
        current = 0;
      }
      if (current == 0) {
        zeros++;
      }
      times--;
    }
  }
  return zeros;
}

export const solve: Solution = (source) => {
  title("Day 1: Nums Counting.");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
