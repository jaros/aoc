
import { Solution, readInput, title, withTime } from "../../common/types";

const digits: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

type DigitExtractor = (char: string, idx: number, line: string) => string | null;
type DigetFinder = (line: string, extractor: DigitExtractor) => string | null;

const getDigitNum: DigitExtractor = (c: string): string | null => c >= '0' && c <= '9' ? c : null;;

const getDigit: DigitExtractor = (c: string, i: number, line: string): string | null =>
  getDigitNum(c, i, line) ?? Object.entries(digits).find(([k]) => line.substring(i, i + k.length) == k)?.[1] ?? null;

const getReducer = (line: string, extractor: DigitExtractor) => (prev: string | null, c: string, i: number) => prev ?? extractor(c, i, line);

const findCalibration = (line: string, extractor: DigitExtractor): string => {
  let arr = line.split('');
  let reducer = getReducer(line, extractor)
  return `${arr.reduce(reducer, null)}${arr.reduceRight(reducer, null)}`;
} 

const countDigits = (data: string, extractor: DigitExtractor) => data.split("\n")
  .map(line => parseInt(findCalibration(line, extractor)))
  .reduce((a, b) => a + b, 0);

const part1 = (data: string) => {
  return countDigits(data, getDigitNum);
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
