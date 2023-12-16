
import { Solution, readInput, title, withTime } from "../../common/types";

const getRanges = (block: string): number[][] => {
  let ranges = [];
    let blokLines = block.split("\n");
    for (let i=1; i < blokLines.length; i++) {
      let range = blokLines[i].split(" ").map(Number);
      ranges.push(range);
    }
    return ranges;
}

const part1 = (data: string) => {
  let [seedsStr, ...blocks] = data.split("\n\n");

  let seeds = seedsStr.split(":")[1].trim().split(" ").map(Number);
  
  for (let block of blocks) {
    let ranges = getRanges(block);
    let newSeeds = [];
    for (let x of seeds) {
      let mapped = false;
      for (let [a, b, c] of ranges) {
        if (b <= x && x < b + c) {
          newSeeds.push(x - b + a);
          mapped = true;
          break;
        }
      }
      if (!mapped) {
        newSeeds.push(x);
      }
    }
    seeds = newSeeds;
  }
  return Math.min(...seeds);
}

const part2 = (data: string) => {
  let [inputsStr, ...blocks] = data.split("\n\n");

  let inputs = inputsStr.split(":")[1].trim().split(" ").map(Number);
  let seeds: number[][] = [];

  for (let i=0; i < inputs.length; i += 2) {
    seeds.push([inputs[i], inputs[i] + inputs[i+1]]);
  }

  for (let block of blocks) {
    let ranges = getRanges(block);
    let newSeeds = [];
    while (seeds.length > 0) {
      let [start, end] = seeds.pop()!;
      let mapped = false;
      for (let [a, b, c ] of ranges) {
        let overlapStart = Math.max(start, b);
        let overlapEnd = Math.min(end, b + c);
        if (overlapStart < overlapEnd) {
          mapped = true;
          newSeeds.push([overlapStart - b + a, overlapEnd - b + a]);
          if (overlapStart > start) {
            seeds.push([start, overlapStart]);
          }
          if (end > overlapEnd) {
            seeds.push([overlapEnd, end]);
          }
          break;
        }
      }
      if (!mapped) {
        newSeeds.push([start, end]);
      }
    }
    seeds = newSeeds;
  }
  return Math.min(...seeds.flat());
}

export const solve: Solution = (source) => {
  title("Day 5: If You Give A Seed A Fertilizer");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
