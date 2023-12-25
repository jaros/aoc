import { Solution, readInput, title, withTime } from "../../common/types";
import * as nx from 'jsnetworkx';



const part1 = (data: string) => {
  let comps: Record<string, string[]> = Object.fromEntries(data.split('\n').map(row => row.split(': ')).map(([key, list]) => [key, list.split(' ')]));
  let g = new nx.Graph();

  for (let [key, nodes] of Object.entries(comps)) {
    for (let node of nodes) {
      g.addEdge(key, node);
      g.addEdge(node, key);
    }
  }

  console.log(g.numberOfEdges())
  // console.log(g.minimumEdgeCut())
  // console.log(nx.minimumEdgeCut(g))

  return 0;
};

const part2 = (data: string) => {
  // let comps: Record<string, string[]> = Object.fromEntries(data.split('\n').map(row => row.split(': ')).map(([key, list]) => [key, list.split(' ')]));
  // console.log(comps)
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 25: Snowverload");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
