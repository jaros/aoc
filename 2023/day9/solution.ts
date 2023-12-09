
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

const parseInput = (data: string) : number[][] => {
  return data.split("\n").map(line => line.split(" ").map(Number));
}

let allZeros = (nums: number[]) => nums.every(n => n == 0);

let findNextSeq = (nums: number[]): number[] => {
  let nextSeq = [];
  for (let i=1; i < nums.length; i++) {
    nextSeq.push(nums[i] - nums[i-1]);
  }
  return nextSeq;
}

let findRightNum = (nums: number[]): number => {
  while (!allZeros(nums)) {
    return nums[nums.length-1] + findRightNum(findNextSeq(nums));  
  }
  return nums[0];
}

let findLeftNum = (nums: number[]): number => {
  while (!allZeros(nums)) {
    return nums[0] - findLeftNum(findNextSeq(nums));  
  }
  return nums[0];
}

const part1 = (data: string) => {
  return parseInput(data).map(findRightNum).reduce(sum);
}

const part2 = (data: string) => {
  return parseInput(data).map(findLeftNum).reduce(sum);
}


export const solve: Solution = (source) => {
  title("Day 9: Mirage Maintenance");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
