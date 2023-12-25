import { Solution, readInput, title, withTime } from "../../common/types";
import { writeFileSync } from "fs";
import path from "path";

type Graph = Record<string, string[]>;

function printGraphVizInput(input: Graph) {
  let out = '';
  out += 'graph {\n';
  Object.entries(input).forEach(([key, value]) => {
    out += `  ${key} -- { ${value.join(' ')} };\n`;
  })
  out += '}\n'
  writeFileSync(path.resolve(import.meta.dir, 'graph.txt'), out);
}

function makeGraph(data: string) {
  let g: Graph = {};
  for (let l of data.split('\n')) {
    const [first, rest] = l.split(': ');
    for (let part of rest.split(' ')) {
      const firstEdges = g[first] || []
      const otherEdges = g[part] || []
      g[part] = [...otherEdges, first]
      g[first] = [...firstEdges, part]
    }
  }
  return g;
}

function getClusterSize(graph: Graph, start: string) {
  const seen = new Set<string>()
  const queue = [start]
  while (queue.length > 0) {
    const current = queue.shift()!
    if (seen.has(current)) continue
    seen.add(current)
    queue.push(...graph[current]!)
  }
  return seen.size
}

function removeEdge(graph: Graph, edge: [string, string]) {
  const [a, b] = edge
  graph[a] = graph[a]!.filter(x => x !== b)
  graph[b] = graph[b]!.filter(x => x !== a)
}

// Used graphviz with neato layout to see the three edges connecting the two subgraphs
// `echo "$(<graph.txt )" | dot -Tsvg -Kneato > graph.svg`
const toRemove: [string, string][] = [
  ['fvm', 'ccp'],
  ['thx', 'frl'],
  ['lhg', 'llm']
]

const part1 = (data: string) => {
  let g: Graph = makeGraph(data);
  printGraphVizInput(g);

  toRemove.forEach(edge => removeEdge(g, edge))
  return getClusterSize(g, 'fvm') * getClusterSize(g, 'ccp')
};

export const solve: Solution = (source) => {
  title("Day 25: Snowverload");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
};
