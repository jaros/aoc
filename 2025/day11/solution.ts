
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
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 11: Reactor");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
