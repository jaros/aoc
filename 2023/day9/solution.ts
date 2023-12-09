
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

let findNextNum = (nums: number[]): number => {
  let nextSeq = findNextSeq(nums);
  if (allZeros(nextSeq)) {
    return nums[nums.length-1];
  }
  return nums[nums.length-1] + findNextNum(nextSeq);
}

let findPrevNum = (nums: number[]): number => {
  let nextSeq = findNextSeq(nums);
  if (allZeros(nextSeq)) {
    return nums[nums.length-1];
  }
  return nums[0] - findPrevNum(nextSeq);
}

const part1 = (data: string) => {
  return parseInput(data).map(findNextNum).reduce(sum);
}

const part2 = (data: string) => {
  return parseInput(data).map(findPrevNum).reduce(sum);
}


export const solve: Solution = (source) => {
  title("Day 9: Mirage Maintenance");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
