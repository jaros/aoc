import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let list = data.split("\n").map(l => l.split("-"))
  let pairs = new Set();
  for (let [c1, c2] of list) {
    pairs.add(`${c1}-${c2}`);
    pairs.add(`${c2}-${c1}`);
  }
  
  const toKey = (comps: string[]) => comps.toSorted().join(",");
  // set of ordered triplets
  let sets = new Set<string>();
  for (let [c1, c2] of list) {
    for (let [nc1, nc2] of list) {
      // check nc1 for triplet
      if (nc1 != c1 && nc1 != c2 && (nc2 == c1 || nc2 == c2)) {
        if (pairs.has(`${nc1}-${c1}`) && pairs.has(`${nc1}-${c2}`)) {
          sets.add(toKey([c1, c2, nc1]));
        }
      }

      if (nc2 != c1 && nc2 != c2 && (nc1 == c1 || nc1 == c2)) {
        if (pairs.has(`${nc2}-${c1}`) && pairs.has(`${nc2}-${c2}`)) {
          sets.add(toKey([c1, c2, nc2]));
        }
      }
      
    } 
  }
  // console.log(sets.size)
  return Array.from(sets).filter(s => s.split(",").some(c => c.startsWith("t"))).length;
};

const part2 = (data: string) => {
  let list = data.split("\n").map(l => l.split("-"))
  let pairs = new Set();
  for (let [c1, c2] of list) {
    pairs.add(`${c1}-${c2}`);
    pairs.add(`${c2}-${c1}`);
  }
  
  const toKey = (comps: string[]) => comps.toSorted().join(",");
  // set of ordered triplets
  let sets = new Set<string>();
  for (let [c1, c2] of list) {
    for (let [nc1, nc2] of list) {
      // check nc1 for triplet
      if (nc1 != c1 && nc1 != c2 && (nc2 == c1 || nc2 == c2)) {
        if (pairs.has(`${nc1}-${c1}`) && pairs.has(`${nc1}-${c2}`)) {
          sets.add(toKey([c1, c2, nc1]));
        }
      }

      if (nc2 != c1 && nc2 != c2 && (nc1 == c1 || nc1 == c2)) {
        if (pairs.has(`${nc2}-${c1}`) && pairs.has(`${nc2}-${c2}`)) {
          sets.add(toKey([c1, c2, nc2]));
        }
      }
      
    } 
  }
  
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 23: LAN Party");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
