
import { Solution, readInput, title, withTime } from "../../common/types";

const parseData = (data: string): string[][] => {
  return data.split('\n').map(c => c.split(''));
}

const transpose = (m: string[][]) => m[0].map((_, i) => m.map((x) => x[i]));


let getLoad = (col: string[]): number => {
  let total = 0;
  let len = col.length;
  let beforeEmptyCells = 0;
  for (let i=0; i < len; i++) {
    if (col[i] == '#') {
      beforeEmptyCells = 0;
    } else if (col[i] == '.') {
      beforeEmptyCells++;
    } else if (col[i] == 'O') {
      let weight = len - i + beforeEmptyCells;
      total += weight; 
    }

  }

  return total;
}

const part1 = (data: string) => {
  let m = parseData(data);
  let cols = transpose(m);
  let total = 0;
  for (let i=0; i < cols.length; i++) {
    total += getLoad(cols[i]);
  }
  return total;
}

const part2 = (data: string) => {
  let m = parseData(data);
  let cols = transpose(m);
  let total = 0;
  for (let i=0; i < cols.length; i++) {
    total += getLoad(cols[i]);
  }
  return total;
}

export const solve: Solution = (source) => {
  title("Day 14: Parabolic Reflector Dish");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
