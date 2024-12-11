import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

let cache: Map<string, number> = new Map();

let makeKey = (stone: number, steps: number) => `${stone}_${steps}`;

let getCache = (stone: number, steps: number): number | null => {
  let key = makeKey(stone, steps);
  if (cache.has(key)) {
    return cache.get(key)!;
  }
  return null;
}

let doCache = (stone: number, steps: number, val: number): number => {
  cache.set(makeKey(stone, steps), val);
  return val;
}

let count = (stone: number, steps: number): number =>
  getCache(stone, steps) ?? doCache(stone, steps, countIntern(stone, steps));

let countIntern = (stone: number, steps: number): number => {
  if (steps == 0) {
    return 1;
  }
  if (stone == 0) {
    return count(1, steps - 1);
  }
  let sStr = String(stone);
  if (sStr.length % 2 == 0) {
    let mid = sStr.length / 2;
    let left = Number(sStr.slice(0, mid));
    let right = Number(sStr.slice(mid));
    return count(left, steps - 1) + count(right, steps - 1);
  }
  return count(stone * 2024, steps - 1);
}

const part1 = (data: string) => {
  let stones = data.split(" ").map(Number);
  return stones.map(stone => count(stone, 25)).reduce(sum, 0)
};

const part2 = (data: string) => {
  let stones = data.split(" ").map(Number);
  return stones.map(stone => count(stone, 75)).reduce(sum, 0)
};

export const solve: Solution = (source) => {
  title("Day 11: Plutonian Pebbles");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
