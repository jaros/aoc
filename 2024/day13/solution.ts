import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const nums = (s: string): number[] => {
  return s.match(/\d+/g)!.map(Number)
};

const part1 = (data: string) => {
  // let lines = parseInput(data);
  // console.log(lines)
  let ans = 0
  for (let l of data.split("\n\n")) {
    let ll = l.split("\n")
    let a = nums(ll[0])
    let b = nums(ll[1])
    let p = nums(ll[2])
    // console.log(a)
    let best = 5000

    for (let i=0; i < 101; i++) {
      for (let j=0; j<101; j++) {
        let nx = a[0]*i + b[0]*j
        let ny = a[1]*i + b[1]*j
        if (p[0] == nx && p[1] == ny) {
          best = Math.min(best, 3*i+j)
        }
      }
    }
    if (best < 5000) {
      ans += best
    }
 
  }
  return ans;
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 13: Claw Contraption");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
