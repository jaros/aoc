
import { Solution, readInput, title, withTime } from "../../common/types";

const getLines = (data: string) => data.split("\n")
// .map(items => items.split("\n")
// .map(Number)
// .reduce((a, b) => a + b), 0);

const part1 = (data: string) => {
  const lines = getLines(data);

  let current = 50;

  let zeros = 0
  for (let line of lines) {
    let times = Number(line.substring(1));
    let d = line[0];
    if (d == "R") {
      current = (current + times) % 100;
    } else {
      current = (current - times + 100) % 100;
    }
    if (current == 0) {
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
    
    if (d == "R") {
      let next = current + times;
      zeros += Math.floor(next/100);
      current = next % 100;
    } else {
      let next = current - times;
      if (next <= 0) {
        zeros += Math.floor(next/-100);
        if (current != 0) { // crossed the zero, 0 to -5 is not counted
          zeros++;
        }
      }
      current = ((next % 100) + 100) % 100; 
    }
    // console.log(line, "current", current, "zeros", zeros)
  }
  return zeros;
}

export const solve: Solution = (source) => {
  title("Day 1: Secret Entrance");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
