import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => data.split("\n");

let isIncreasing = (a: number, b: number) => a - b < 0;

let isSafe = (levels: number[], dir: boolean) => {
  for (let i = 1; i < levels.length; i++) {
    let a = levels[i - 1];
    let b = levels[i];
    let currDir = isIncreasing(a, b);
    if (currDir != dir) {
      return false;
    }
    let diff = Math.abs(a - b);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
};

const part1 = (data: string) => {
  let reports = parseInput(data);
  let levels: number[][] = reports.map((report) =>
    report.split(" ").map(Number)
  );
  let countSafe = 0;
  for (let level of levels) {
    let dir = isIncreasing(level[0], level[1]);
    if (isSafe(level, dir)) {
      countSafe++;
    }
  }
  return countSafe;
};


let isSafe2 = (levels: number[], dir: boolean) => {

  // original
  let isOk = isSafe(levels, dir);
  if (isOk) {
    return true;
  }
  // with one element dropped
  for (let dropElIdx = 0; dropElIdx < levels.length; dropElIdx++) {
    let ll = levels.toSpliced(dropElIdx, 1);
    isOk = isSafe(ll, dir);
    if (isOk) {
      return true;
    }
  }
  return false;
};


const part2 = (data: string) => {
  let reports = parseInput(data);
  let levels: number[][] = reports.map((report) =>
    report.split(" ").map(Number)
  );
  let countSafe = 0;
  for (let level of levels) {
    if (isSafe2(level, true) || isSafe2(level, false)) {
      countSafe++;
    }
  }
  return countSafe;
};

export const solve: Solution = (source) => {
  title("Day 2: Red-Nosed Reports");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
