
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let instructions = data.split('\n').map(Number);

  let steps = 0;

  let i = 0;
  while (i < instructions.length) {
    steps++;
    let prev = i;
    i = i + instructions[i];
    instructions[prev]++;
  }

  return steps;
}


const part2 = (data: string) => {
  let instructions = data.split('\n').map(Number);

  let steps = 0;

  let i = 0;
  while (i < instructions.length) {
    steps++;
    let prev = i;
    i = i + instructions[i];
    if (instructions[prev] >= 3) {
      instructions[prev]--;
    } else {
      instructions[prev]++;
    }
  }

  return steps;
}

export const solve: Solution = (source) => {
  title("Day 5: A Maze of Twisty Trampolines, All Alike");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
