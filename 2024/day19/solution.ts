import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let [patt, dess] = data.split("\n\n");
  let patterns = patt.split(", ");
  let designs = dess.split("\n")

  const maxLen = Math.max(...patterns.map(p => p.length));
  
  const pp = new Set(patterns);

  let cache: Map<string, boolean> = new Map();

  const isPossible = (design: string): boolean => {
    if (cache.has(design)) {
      return cache.get(design)!;
    }
    if (design.length == 0) {
      return true;
    }
    let possibilities = []
    for (let i=1; i <= maxLen; i++) {
      if (design.length >= i) {
        let prefix = design.slice(0, i);
        if (pp.has(prefix)) {
          let key = design.slice(i);
          let branch = isPossible(design.slice(i))
          cache.set(key, branch)
          possibilities.push(branch)
        }
      }
    }
    return possibilities.some(val => val);
  }

  return designs.filter(isPossible).length;
};

const part2 = (data: string) => {
  let [patt, dess] = data.split("\n\n");
  let patterns = patt.split(", ");
  let designs = dess.split("\n")

  const maxLen = Math.max(...patterns.map(p => p.length));
  
  const pp = new Set(patterns);

  let cache: Map<string, number> = new Map();

  const possibleWays = (design: string): number => {
    if (cache.has(design)) {
      return cache.get(design)!;
    }
    if (design.length == 0) {
      return 1;
    }
    let possibilities = []
    for (let i=1; i <= maxLen; i++) {
      if (design.length >= i) {
        let prefix = design.slice(0, i);
        if (pp.has(prefix)) {
          let key = design.slice(i);
          let nr = possibleWays(design.slice(i))
          cache.set(key, nr)
          possibilities.push(nr)
        }
      }
    }
    return possibilities.reduce(sum, 0);
  }

  return designs.flatMap(possibleWays).reduce(sum, 0);
};

export const solve: Solution = (source) => {
  title("Day 19: Linen Layout");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
