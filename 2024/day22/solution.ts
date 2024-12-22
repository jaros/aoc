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
    for (let i=0; i < 1; i++) {
      next = nextNum(next);
    }
    finalPrices.push(next);
    break;
  }
  return finalPrices.reduce(sum, 0);
};

let toKey = (nums: number[]) => nums.join(",");

const part2 = (data: string) => {
  let initPrices = data.split("\n").map(Number);
  let seqToTotal: Map<string, number> = new Map();
  for (let price of initPrices) {
    let next = price;
    let prices = [next % 10];
    prices.push(next);
    for (let i=0; i < 2000; i++) {
      next = nextNum(next);
      prices.push(next % 10);
    }

    let seen = new Set();
    for (let i=0; i < prices.length - 4; i++) {
      let [a, b, c, d, e] = prices.slice(i, i+5);
      let seq = [b-a, c-b, d-c, e-d];
      let key = toKey(seq);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key)
      seqToTotal.set(key, (seqToTotal.get(key) ?? 0) + e );
    }
  }
  return Math.max(...seqToTotal.values());
};

export const solve: Solution = (source) => {
  title("Day 22: Monkey Market");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
