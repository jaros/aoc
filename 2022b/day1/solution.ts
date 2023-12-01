
import { Solution, readInput, title, withTime } from "../../common/types";

const getElves = (data: string) => data.split("\n\n").map(items => items.split("\n").map(Number).reduce((a, b) => a + b), 0);

const part1 = (data: string) => {
  const elves = getElves(data);
  console.log("max calories", Math.max(...elves));
}

const part2 = (data: string) => {
  const elves = getElves(data);
  elves.sort((a, b) => b - a)
  console.log("top 3 calories", elves[0] + elves[1] + elves[2]);
}

export const solve: Solution = (source) => {
  title("Calorie Counting.");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
