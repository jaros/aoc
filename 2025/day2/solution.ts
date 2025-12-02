
import { Solution, readInput, title, withTime } from "../../common/types";

type Range = {start: number; end: number;}
const getRanges = (data: string) => data.split("\n").map(line => line.split(","))
.flat()
.filter(line => line.length != 0)
.map((range): Range => {
  let [a,b] = range.split("-")
  return {start: Number(a), end: Number(b)}
});



const part1 = (data: string) => {
  const ranges = getRanges(data);
  // console.log(ranges)
  let repeated = [];
  for (let {start, end} of ranges) {
    for (let i=start; i <= end; i++) {
      let str = String(i);
      let len = str.length;
      if (len % 2 == 0) {
          let half = len / 2;
          let right = str.substring(0, half)
          let left = str.substring(half);
          if (right == left) {
            repeated.push(i);
          }
      }
    }
  }

  return repeated.reduce((a,b) => a + b, 0);
}

const part2 = (data: string) => {
  const ranges = getRanges(data);
  let repeated = [];
  for (let {start, end} of ranges) {
    for (let i=start; i <= end; i++) {
      let str = String(i);
      let len = str.length;
      let half = len / 2;
      let l = 1;
      while (l <= half) {
        // check for parity
        if (len % l == 0) {
          let parts = [];
          for (let j=0; j < str.length; j+=l) {
            parts.push(str.substring(j, j+l));
          }
          let first = parts[0];
          if (parts.every((pp) => pp == first)) {
            repeated.push(i);
            break;
          }
        }
        l++;
      }
    }
  }
  // console.log(repeated)
  return repeated.reduce((a,b) => a + b, 0);
}

export const solve: Solution = (source) => {
  title("Day 2: Gift Shop");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
