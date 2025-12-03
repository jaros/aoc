
import { Solution, readInput, title, withTime } from "../../common/types";

const getLines = (data: string) => data.split("\n").map(line => line.split(""))

const findMaxBankJoltage = (bank: string[], K: number) => {
  let remove = bank.length - K;
  const stack: string[] = [];
  for (let ch of bank) {
     while(stack.length > 0 && remove > 0 && stack[stack.length - 1] < ch) {
      stack.pop();
      remove--;
     }
    stack.push(ch);
  }
  return stack.slice(0, K).join("");
}

const findTotalMaxJoltage = (banks: string[][], K: number) => {
  let sum = 0n;
  for (let bank of banks) {
    let maxJoltage = findMaxBankJoltage(bank, K);
    sum += BigInt(maxJoltage);
  }
  return sum;
}

const part1 = (data: string) => {
  return findTotalMaxJoltage(getLines(data), 2);
}

const part2 = (data: string) => {
  return findTotalMaxJoltage(getLines(data), 12);
}

export const solve: Solution = (source) => {
  title("Day 3: Lobby");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
