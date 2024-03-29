import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

let g: Record<string, Set<string>> = {};

let buildGraph = (data: string) => {
  let getOrDef = (key: string) => {
    let set = g[key] ?? new Set();
    g[key] = set;
    return set;
  };

  for (let line of data.split("\n")) {
    let [a, b] = line.split(" <-> ");
    for (let c of b.split(", ")) {
      getOrDef(a).add(c);
      getOrDef(c).add(a);
    }
  }
};

let countNodesInGroup = (start: string, seen: Set<string>) => {
  seen.add(start);
  for (let n of g[start]) {
    if (!seen.has(n)) {
      countNodesInGroup(n, seen);
    }
  }
};

const part1 = (data: string) => {
  buildGraph(data);
  let seen = new Set<string>();
  countNodesInGroup("0", seen);
  return seen.size;
};

const part2 = (data: string) => {
  buildGraph(data);

  let groups: Set<string>[] = [];
  for (let node in g) {
    if (groups.some((g) => g.has(node))) {
      continue;
    }
    let seen = new Set<string>();
    countNodesInGroup(node, seen);
    groups.push(seen);
  }

  return groups.length;
};

export const solve: Solution = (source) => {
  title("Day 12: Digital Plumber");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
