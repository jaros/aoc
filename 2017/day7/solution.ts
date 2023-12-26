
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const getPrograms = (data: string) => {
  let programs: Record<string, { weight: number; children: string[] }> = {};

  for (let line of data.split('\n')) {
    let [self, rest] = line.split(' -> ');
    let [name, weight] = self.split(' (');
    let children = rest ? rest.split(', ') : [];
    programs[name] = {
      weight: Number(weight.slice(0, weight.length - 1)),
      children
    }
  }
  return programs;
}

const findBottom = (programs: ReturnType<typeof getPrograms>) => {
  let all = Object.entries(programs);
  let withChild = all.filter(([k, v]) => v.children.length > 0);
  let allChildRefs = new Set(withChild.flatMap(([k, v]) => v.children));

  return withChild.find(([name]) => !allChildRefs.has(name))!;
}

const part1 = (data: string) => {
  let programs = getPrograms(data);
  let [bottom] = findBottom(programs);
  return bottom;
}


const part2 = (data: string) => {
  let programs = getPrograms(data);

  let fixDiscWeight = (name: string): { weight: number, is_fixed: boolean } => {
    if (programs[name].children.length == 0) {
      return { weight: programs[name].weight, is_fixed: false };
    }
    let childrenWeights: [string, number][] = [];
    for (let child of programs[name].children) {
      let { weight, is_fixed } = fixDiscWeight(child);
      if (is_fixed) {
        return { weight, is_fixed };
      }
      childrenWeights.push([child, weight]);
    }
    let freqs: Record<number, number> = {};
    for (let [_, weight] of childrenWeights) {
      let w = freqs[weight] ?? 0;
      freqs[weight] = w + 1;
    }
    if (Object.keys(freqs).length > 1) {
      let [major, minor] = Object.entries(freqs).sort((a, b) => b[1] - a[1]);
      let diff = Number(major[0]) - Number(minor[0]);
      let [fixChildName] = childrenWeights.find(([_, w]) => w == Number(minor[0]))!;
      let fixedWeight = programs[fixChildName].weight + diff;
      return { weight: fixedWeight, is_fixed: true };
    }

    return { weight: programs[name].weight + childrenWeights.map(([_, w]) => w).reduce(sum), is_fixed: false };
  }

  let [root] = findBottom(programs);
  let {weight} = fixDiscWeight(root)
  return weight;
}

export const solve: Solution = (source) => {
  title("Day 7: Recursive Circus");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
