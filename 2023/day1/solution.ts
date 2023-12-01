
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let calibrations = data.split("\n").map(line => {
    let val = "";
    for (let i = 0; i < line.length; i++) {
      let c = Number(line.charAt(i));
      if (Number.isInteger(c))
        val += c;
    }
    return parseInt(val[0] + val[val.length - 1]);
  });
  return calibrations.reduce((a, b) => a + b, 0);
}

const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 1: Trebuchet?!");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
