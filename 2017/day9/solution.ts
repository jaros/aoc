
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let openBrackets = 0;
  let ignoreNext = false;
  let withinGarbage = false;
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    if (ignoreNext) {
      ignoreNext = false;
      continue;
    }
    else if (data.charAt(i) == '!') {
      ignoreNext = true;
    }
    else if (data.charAt(i) == '>') {
      withinGarbage = false;
    }
    else if (withinGarbage) {
      continue;
    }
    else if (data.charAt(i) == '<') {
      withinGarbage = true;
    }
    else if (data.charAt(i) == '{') {
      openBrackets++;
    }
    else if (data.charAt(i) == '}') {
      total += openBrackets;
      openBrackets--;
    }
  }

  return total;
}


const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 9: Stream Processing");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
