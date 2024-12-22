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

const part2 = (data: string) => {
  let initPrices = data.split("\n").map(Number);
  let oneDigitsPrices: number[][] = [];
  let diffsPrices: number[][] = [];
  for (let price of initPrices) {
    let next = price;
    let prices = [];
    prices.push(next);
    for (let i=0; i < 9; i++) {
      next = nextNum(next);
      prices.push(next);
    }
    let oneDigits: number[] = prices.map(p => p % 10);
    oneDigitsPrices.push(oneDigits);
    let diffs: number[] = [0];
    for (let i=1; i < oneDigits.length; i++) {
      diffs.push(oneDigits[i] - oneDigits[i-1]);
    }
    diffsPrices.push(diffs);
  }
  for (let j=0; j < oneDigitsPrices.length; j++) {
    let ps = oneDigitsPrices[j];
    for (let i=0; i < ps.length; i++) {
      console.log(ps[i] + " : " + diffsPrices[j][i], ) 
    }
  }
  
  // find max bananas per buyer - use dfs with caching

  return -1;
};

export const solve: Solution = (source) => {
  title("Day 22: Monkey Market");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
