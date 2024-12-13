import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const nums = (s: string): number[] => {
  return s.match(/\d+/g)!.map(Number)
};

const part1 = (data: string) => {
  let ans = 0
  for (let block of data.split("\n\n")) {
    let [a, b, p] = block.split("\n")
    let [ax, ay] = nums(a)
    let [bx, by] = nums(b)
    let [px, py] = nums(p)
    let best = 5000

    for (let i=0; i < 101; i++) {
      for (let j=0; j<101; j++) {
        let nx = ax*i + bx*j
        let ny = ay*i + by*j
        if (px == nx && py == ny) {
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
  let ans = 0
  for (let block of data.split("\n\n")) {
    let [a, b, p] = block.split("\n")
    let [ax, ay] = nums(a)
    let [bx, by] = nums(b)
    let [px, py] = nums(p).map(x => x + 10000000000000)

    let ca = (px * by - py * bx) / (ax * by - ay * bx);
    let cb = (px - ax * ca) / bx;
    if (ca % 1 == 0 && cb % 1 == 0) {
      ans += ((ca * 3) + cb);
    }
 
  }
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 13: Claw Contraption");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
