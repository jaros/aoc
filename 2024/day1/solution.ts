
import { Solution, readInput, title, withTime } from "../../common/types";


const SUM = 2020;

const parseInput = (data: string) => data.split("\n");

const part1 = (data: string) => {
  
  let lines = parseInput(data);
  let pairs = lines.map(line => line.split(/\s+/));
  let l1 = [];
  let l2 = [];
  let diffs = [];
  for (let p of pairs) {
    l1.push(Number(p[0]));
    l2.push(Number(p[1]));
  }
  l1.sort((a, b) => a - b);
  l2.sort((a, b) => a - b);
  for (let i=0; i < l1.length; i++) {
    diffs.push(Math.abs(l1[i] - l2[i]));
  }

  return diffs.reduce((a, b) => a + b, 0);
};

const part2 = (data: string) => {
  let lines = parseInput(data);
  let pairs = lines.map(line => line.split(/\s+/));
  let left = [];
  let right = [];
  for (let p of pairs) {
    left.push(Number(p[0]));
    right.push(Number(p[1]));
  }

  let rightFreqs: Record<number, number> = {};
  for (let r of right) {
    rightFreqs[r] = (rightFreqs[r] ?? 0) + 1;
  }

  let score: number[] = [];
  for (let l of left) {
    score.push(l * (rightFreqs[l] ?? 0))
  }
  return score.reduce((a, b) => a + b, 0);
};

export const solve: Solution = (source) => {
  title("Day 1: Historian Hysteria");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
