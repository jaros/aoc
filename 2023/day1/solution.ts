
import { Solution, readInput, title, withTime } from "../../common/types";

const digits: Record<string, number> = {one: 1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9};

type DigitExtractor = (line: string, i: number) => number | null;

const getDigitBase: DigitExtractor = (line: string, i: number): number | null => {
  let c = Number(line.charAt(i));
  if (Number.isInteger(c)) return c;
  return null;
};

const getDigit: DigitExtractor = (line: string, i: number): number | null => {
  let c = getDigitBase(line, i);
  if (c) return c;
  else
    for (let key in digits) {
      if (line.substring(i, i + key.length) == key) {
        return digits[key];
      }
    }
  return null;
};

const findFirstDigit = (line: string, extractor: DigitExtractor) => {
  for (let i = 0; i < line.length; i++) {
    let d = extractor(line, i);
    if (d != null) return d;
  }
  return -1;
}

const findLastDigit = (line: string, extractor: DigitExtractor) => {
  for (let i = line.length-1; i >= 0; i--) {
    let d = extractor(line, i);
    if (d != null) return d;
  }
  return -1;
}

const countDigits = (data: string, extractor: DigitExtractor) => {
  let calibrations = data.split("\n").map(line => parseInt(`${findFirstDigit(line, extractor)}${findLastDigit(line, extractor)}`));
  return calibrations.reduce((a, b) => a + b, 0);
}

const part1 = (data: string) => {
  return countDigits(data, getDigitBase);
}

const part2 = (data: string) => {
  return countDigits(data, getDigit);
}

export const solve: Solution = (source) => {
  title("Day 1: Trebuchet?!");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
