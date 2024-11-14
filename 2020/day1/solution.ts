
import { Solution, readInput, title, withTime } from "../../common/types";


const SUM = 2020;

const parseInput = (data: string) => data.split("\n").map(Number);

const part1 = (data: string) => {
  
  let nums = parseInput(data);
  
  for (let i =0; i<nums.length; i++) {
    for (let j=i+1; j < nums.length; j++) {
      if (nums[i] + nums[j] === SUM) {
        return nums[i] * nums[j];
      }
    }
  }
  return -1;
};

const part2 = (data: string) => {
  let nums = parseInput(data);
  let invertCache: Record<number, number> = {};
  for (let i =0; i<nums.length; i++) {
    invertCache[(SUM - nums[i])] = i;
  }

  for (let i =0; i<nums.length; i++) {
    for (let j=i+1; j < nums.length; j++) {
      let currSum = nums[i] + nums[j];
      let diffIdx = invertCache[currSum];
      if (diffIdx > -1 && diffIdx != i && diffIdx != j) {
        return nums[i] * nums[j] * nums[diffIdx];
      }
    }
  }
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 1: Report Repair");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
