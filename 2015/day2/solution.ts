
import { Solution, readInput, title, withTime } from "../../common/types";

const sum = (a: number, b: number) => a + b;
const sides = (box: string): number[] => box.split('x').map(Number);

const wrappingPaper = ([l, w, h]: number[]): number => {
  let surfaces = [l * w, w * h, h * l];
  return surfaces.map(s => s * 2).reduce(sum, 0) + Math.min(...surfaces)
};

const ribbonLength = ([l, w, h]: number[]): number => {
  let [s1, s2] = [l, w, h].toSorted((a, b) => a - b);
  return s1 * 2 + s2 * 2 + (l * w * h);
};

const process = (data: string, calculus: (sides: number[]) => number) => data.split('\n').map(sides).map(calculus).reduce(sum, 0)

const part1 = (data: string) => {
  return process(data, wrappingPaper);
};

const part2 = (data: string) => {
  return process(data, ribbonLength);
};

export const solve: Solution = (source) => {
  title("Day 2: I Was Told There Would Be No Math");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
