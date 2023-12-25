
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const countValid = (data: string, toFreq: (words: string[]) => Record<string, number>) => data
  .split('\n')
  .map(line => line.split(' '))
  .map(toFreq)
  .filter(freq => Object.values(freq).every(freq => freq == 1)).length;

const part1 = (data: string) => {
  let toFreq = (words: string[]) => {
    let map: Record<string, number> = {};
    for (let word of words) {
      let c = map[word] ?? 0;
      map[word] = c + 1;
    }
    return map;
  }
  return countValid(data, toFreq);
}


const part2 = (data: string) => {
  let toFreq = (words: string[]) => {
    let map: Record<string, number> = {};
    for (let word of words) {
      let ordered = word.split('').sort().join('');
      let c = map[ordered] ?? 0;
      map[ordered] = c + 1;
    }
    return map;
  }
  return countValid(data, toFreq);
}

export const solve: Solution = (source) => {
  title("Day 4: High-Entropy Passphrases");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
