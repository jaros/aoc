
import { Solution, readInput, title, withTime } from "../../common/types";

type Element = {
  L: string;
  R: string;
}

type Instruction = 'L' | 'R';

type Input = {
  instructions: Instruction[];
  map: Record<string, Element>;
}

let parseInput = (data: string): Input => {
  let [instructionsS, mapS] = data.split("\n\n");
  let instructions: Instruction[] = instructionsS.split("") as Instruction [];
  let map = 
  Object.fromEntries(mapS.split("\n").map(line => {
    let [key, leftRight] = line.split(" = ");
    let [L, R] = leftRight.substring(1, leftRight.length - 1).split(", ");
    return [key, {L, R}];
  }));
  return {instructions, map};
}

const part1 = (data: string) => {
  let {instructions, map} = parseInput(data);
  let step = 0;
  let pos = 'AAA';
  while (pos != 'ZZZ') {
    let inst = instructions[step % instructions.length];
    pos = map[pos][inst]
    step++;
  }
  return step;
}

const gcd = (a: number, b: number): number => {
  if (b === 0) {
      return a;
  }
  return gcd(b, a % b);
}

const part2 = (data: string) => {
  let {instructions, map} = parseInput(data);
  let isEnd = (key: string) => key.endsWith('Z');
  let positions = Object.keys(map).filter(key => key.endsWith('A'));
  let steps = positions.map(pos => {
    let s = 0;
    while (!isEnd(pos)) {
      let inst = instructions[s % instructions.length];
      pos = map[pos][inst]
      s++;
    }
    return s;
  });
  
// Find lowest common multiple of all loop lengths
  let lcm = steps[0];
  for (let i = 1; i < steps.length; i++) {
      const loop = steps[i];
      lcm = (lcm * loop) / gcd(lcm, loop);
  }
  return steps[steps.length - 1];
}


export const solve: Solution = (source) => {
  title("Day 8: Haunted Wasteland");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
