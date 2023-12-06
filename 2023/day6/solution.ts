
import { Solution, readInput, title, withTime } from "../../common/types";
import { multiply, sum } from "../utils";


const parseInput = (data: string) => data.split("\n").map(line => line.split(":")[1].trim().split(/\s+/).map(Number))

const part1 = (data: string) => {
  // speed increases by one millimeter per millisecond
  let [times, distances] = parseInput(data);
  let ways: number[] = new Array(times.length).fill(0);

  for (let i=0; i < times.length; i++) {
    let time = times[i];
    let distanceRecord = distances[i];
    for (let t=1; t < time; t++) {
      let remainTime = time - t;
      let total = t * remainTime;
      if (total > distanceRecord) {
        ways[i]++;
      } 
    }
  }
  return ways.reduce(multiply);
}

const part2 = (data: string) => {
  let [times, distances] = parseInput(data);
  let time = Number(times.join(""))
  let distance = Number(distances.join(""))
  let ways = 0;

  for (let t=1; t < time; t++) {
    let remainTime = time - t;
    let total = t * remainTime;
    if (total > distance) {
      ways++;
    }
  }

  return ways;
}

export const solve: Solution = (source) => {
  title("Day 6: Wait For It");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
