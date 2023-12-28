
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let lengths = data.split(',').map(Number);

  let list: number[] = [];
  for (let i = 0; i < 256; i++) { list.push(i) }

  let currPos = 0;
  let skipSize = 0;

  let mod = list.length;
  for (let length of lengths) {
    let from = currPos;
    let to = (from + length - 1);
    while (from < to) { // swap
      let tmp = list[from % mod];
      list[from % mod] = list[to % mod];
      list[to % mod] = tmp;
      from++;
      to--;
    }
    currPos = (currPos + length + skipSize) % mod;
    skipSize++;
  }
  return list[0] * list[1];
}


const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 10: Knot Hash");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
