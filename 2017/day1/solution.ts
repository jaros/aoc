
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let digits = data.trim().split('').map(Number);

  let total = 0;

  let len = digits.length;

  for (let i = 0; i < len; i++) {
    if (digits[i] == digits[(i + 1) % len]) {
      total += digits[i];
    }
  }
  return total;
}

const part2 = (data: string) => {
  let digits = data.trim().split('').map(Number);

  let total = 0;

  let len = digits.length;
  let half = len / 2;

  for (let i = 0; i < len; i++) {
    if (digits[i] == digits[(i + half) % len]) {
      total += digits[i];
    }
  }
  return total;
}

export const solve: Solution = (source) => {
  title("Day 1: Inverse Captcha");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
