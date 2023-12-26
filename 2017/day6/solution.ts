
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";


let toKey = (b: number[]) => b.join('-')

let findIdxOfBiggest = (blocks: number[]) => {
  let max = Math.max(...blocks);
  return blocks.indexOf(max);
}


const part1 = (data: string) => {
  let blocks = data.split('\t').map(Number);
  let seen = new Set<string>();
  let count = 0;
  do {
    count++;
    seen.add(toKey(blocks));
    let i = findIdxOfBiggest(blocks);
    let distribution = blocks[i];
    blocks[i] = 0;
    while (distribution > 0) {
      blocks[(++i % blocks.length)]++;
      distribution--;
    }
  }
  while (!seen.has(toKey(blocks)));
  return count;
}


const part2 = (data: string) => {
  let blocks = data.split('\t').map(Number);
  let seen = new Set<string>();
  let count = 0;
  do {
    count++;
    seen.add(toKey(blocks));
    let i = findIdxOfBiggest(blocks);
    let distribution = blocks[i];
    blocks[i] = 0;
    while (distribution > 0) {
      blocks[(++i % blocks.length)]++;
      distribution--;
    }
  }
  while (!seen.has(toKey(blocks)));

  count = 0;
  seen.clear();
  do {
    count++;
    seen.add(toKey(blocks));
    let i = findIdxOfBiggest(blocks);
    let distribution = blocks[i];
    blocks[i] = 0;
    while (distribution > 0) {
      blocks[(++i % blocks.length)]++;
      distribution--;
    }
  }
  while (!seen.has(toKey(blocks)));

  return count;
}

export const solve: Solution = (source) => {
  title("Day 6: Memory Reallocation");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
