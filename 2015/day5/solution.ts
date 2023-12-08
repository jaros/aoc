
import { Solution, readInput, title, withTime } from "../../common/types";


const vowels = "aeiou".split("");

const forbiddens = ["ab", "cd", "pq", "xy"];

let hasThreeVovels = (line: string) => {
  return line.split("").reduce((count, char) => count + (vowels.includes(char) ? 1 : 0), 0) >= 3;
}

let hasDouble = (line: string) => {
  for (let i = 1; i < line.length; i++) {
    if (line[i] == line[i - 1]) {
      return true;
    }
  }
  return false;
}

let hasForbidden = (line: string) => {
  for (let i = 1; i < line.length; i++) {
    for (let [a,b] of forbiddens) {
      if (line[i - 1] == a && line[i] == b) {
        return true;
      }  
    }
  }
  return false;
}

let isNice = (line: string) => {
  return hasThreeVovels(line) && hasDouble(line) && !hasForbidden(line);
}

const part1 = (data: string) => {
  return data.split("\n").filter(isNice).length;
}

const part2 = (data: string) => {
  return 0;
}


export const solve: Solution = (source) => {
  title("Day 5: Doesn't He Have Intern-Elves For This?");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
