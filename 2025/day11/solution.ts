
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const getLines = (data: string) => data.split("\n")

const part1 = (data: string) => {
  const lines = getLines(data);
  const map = new Map<string, Array<string>>();
  for (let line of lines) {
    let [key, vals] = line.split(": ")
    map.set(key, vals.split(" "));
  }
  // console.log(map)

  let cache = new Map(); // precalculated paths to avoid recalculation

  const traverse = (root: string): number => {
    let children = map.get(root);
    if (!children) {
      return 0;
    }
    if (children.includes("out")) {
      return 1;
    }
    let ways = 0;
    for (let child of children) {
      if (cache.has(child)) {
        ways += cache.get(child);
      } else {
        let count = traverse(child);
        cache.set(child, count)
        ways += count
      }
    }
    return ways;
  }

  return traverse("you")
}

const part2 = (data: string) => {
  const lines = getLines(data);
  const map = new Map<string, Array<string>>();
  for (let line of lines) {
    let [key, vals] = line.split(": ")
    map.set(key, vals.split(" "));
  }
  // console.log(map)

  let cache = new Map(); // precalculated paths to avoid recalculation

  const traverse = (node: string, hasFft: boolean, hasDac: boolean): number => {
    let children = map.get(node);
    if (!children) {
      return 0;
    }

    const cacheKey = `${node}|${hasFft ? 1 : 0}|${hasDac ? 1 : 0}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
    let ways = 0;
    for (let child of children) {
      const nextHasFft = hasFft || child === "fft";
      const nextHasDac = hasDac || child === "dac";
      if (child === "out") {
        if (nextHasFft && nextHasDac) {
          ways += 1;
        }
      } else {
        ways += traverse(child, nextHasFft, nextHasDac);
      }
    }
    cache.set(cacheKey, ways);
    return ways;
  }

  return traverse("svr", false, false)
}

export const solve: Solution = (source) => {
  title("Day 11: Reactor");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
