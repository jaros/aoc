
import { Solution, readInput, title, withTime } from "../../common/types";

const parseData = (data: string): string[] => {
  return data.split('\n');
}

const transpose = (lines: string[]): string[] => lines[0].split('').map((_, i) => lines.map((x) => x[i]).join(''));

let moveStones = (row: string): string => row
.split('#')
.map(group => group.split('').sort().reverse().join(''))
.join('#')

const part1 = (data: string) => {
  let m = parseData(data);
  let cols = transpose(m);
  let moved = cols.map(moveStones);
  let originalView = transpose(moved);

  let total = 0;
  for (let i=0; i < originalView.length; i++) {
    let row = originalView[i]
    let sum = row.split('').filter(c => c == 'O').length * (originalView.length - i);
    total += sum;
  }
  return total;
}

const part2 = (data: string) => {
  let m = parseData(data);
  
  let total = 0;
  return total;
}

export const solve: Solution = (source) => {
  title("Day 14: Parabolic Reflector Dish");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
