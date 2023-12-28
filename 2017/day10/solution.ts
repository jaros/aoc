
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
  let lengths = data.split('').map(ch => ch.charCodeAt(0));
  const suffix = [17, 31, 73, 47, 23];
  lengths.push(...suffix)

  let list: number[] = [];
  for (let i = 0; i < 256; i++) { list.push(i) }

  let mod = list.length;

  let currPos = 0;
  let skipSize = 0;

  for (let r = 0; r < 64; r++) {
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
  }

  let leadingZero = (s: string) => s.length < 2 ? '0' + s : s;

  let denseHash = [];
  for (let i = 0; i < list.length; i += 16) {
    denseHash.push(list.slice(i, i + 16).reduce((a, b) => a ^ b).toString(16))
  }
  return denseHash.map(leadingZero).join('')
}

export const solve: Solution = (source) => {
  title("Day 10: Knot Hash");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
