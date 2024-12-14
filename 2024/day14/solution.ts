import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const nums = (s: string): number[] => {
  return s.match(/[-]?\d+/g)!.map(Number);
};

const mod = (num: number, base: number) => {
  let res = num % base;
  return res < 0 ? res + base : res;
};

const part1 = (data: string) => {
  let robots: number[][] = [];
  for (let line of data.split("\n")) {
    let [px, py, vx, vy] = nums(line);
    robots.push([px, py, vx, vy]);
  }
  const WIDTH = 101;
  const HEIGHT = 103;

  // simulate movements
  const result = [];
  for (let [px, py, vx, vy] of robots) {
    result.push([mod(px + vx * 100, WIDTH), mod(py + vy * 100, HEIGHT)]);
  }

  let tl = 0,
    bl = 0,
    br = 0,
    tr = 0;

  let VM = Math.floor((HEIGHT - 1) / 2);
  let HM = Math.floor((WIDTH - 1) / 2);

  for (let [px, py] of result) {
    if (px == HM || py == VM) {
      continue;
    }
    if (px < HM) {
      if (py < VM) {
        tl += 1;
      } else {
        bl += 1;
      }
    } else {
      if (py < VM) {
        br += 1;
      } else {
        tr += 1;
      }
    }
  }
  return tl * bl * br * tr;
};

const part2 = (data: string) => {
  let robots: number[][] = [];
  for (let line of data.split("\n")) {
    let [px, py, vx, vy] = nums(line);
    robots.push([px, py, vx, vy]);
  }
  const WIDTH = 101;
  const HEIGHT = 103;

  let min_sf = +Infinity;
  let best_iteration = -1;

  // simulate movements
  for (let second = 0; second < WIDTH * HEIGHT; second++) {
    const result = [];
    for (let [px, py, vx, vy] of robots) {
      result.push([mod(px + vx * second, WIDTH), mod(py + vy * second, HEIGHT)]);
    }

    let tl = 0,
      bl = 0,
      br = 0,
      tr = 0;

    let VM = Math.floor((HEIGHT - 1) / 2);
    let HM = Math.floor((WIDTH - 1) / 2);

    for (let [px, py] of result) {
      if (px == HM || py == VM) {
        continue;
      }
      if (px < HM) {
        if (py < VM) {
          tl += 1;
        } else {
          bl += 1;
        }
      } else {
        if (py < VM) {
          br += 1;
        } else {
          tr += 1;
        }
      }
    }
    let sf = tl * bl * br * tr;
    if (sf < min_sf) {
      min_sf = sf;
      best_iteration = second;
    }
  }
  return best_iteration;
};

export const solve: Solution = (source) => {
  title("Day 14: Restroom Redoubt");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
