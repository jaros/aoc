import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

let mod = (n: number) => n % 16777216;

let nextNum = (n: number): number => {
  // 1
  let res = mod(n * 64); // multi 
  n = res ^ n; // mix
  n = mod(n);// prune
  // 2 
  res = Math.floor(n / 32);
  n = res ^ n; // mix
  n = mod(n);// prune
  // 3
  res = mod(n * 2048);
  n = res ^ n; // mix
  n = mod(n);// prune
  return n;
}

const part1 = (data: string) => {
  let initPrices = data.split("\n").map(Number);
  let finalPrices: number[] = [];
  for (let price of initPrices) {
    let next = price;
    for (let i=0; i < 2000; i++) {
      next = nextNum(next);
    }
    finalPrices.push(next);
  }
  return finalPrices.reduce(sum, 0);
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 22: Monkey Market");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
