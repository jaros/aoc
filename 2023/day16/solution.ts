
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

let getGrig = (data: string): string[][] => data.split('\n').map(line => line.split(''));

let grid: string[][] = [];

let calc = (r: number, c: number, dr: number, dc: number) => {
  let vector = [r, c, dr, dc]; // r, c, dr, dc
  let seen = new Set<string>();
  let q = [vector];

  while (q.length != 0) {
    let [r, c, dr, dc] = q.shift()!
    r += dr;
    c+= dc;

    let key = [r, c, dr, dc].join(':') 

    if (r < 0 || r >= grid.length || c <  0 || c >= grid[0].length) {
      continue;
    }

    let ch = grid[r][c]

    if (ch == "." || (ch == "-" && dc != 0) || (ch == "|" && dr != 0)) {
      if (!seen.has(key)) {
        seen.add(key)
        q.push(key.split(':').map(Number))
      }
    } else if (ch == '/') {
      let tmp = dr
      dr = -dc;
      dc = -tmp;
      key = [r, c, dr, dc].join(':') 
      if (!seen.has(key)) {
        seen.add(key)
        q.push(key.split(':').map(Number))
      }
    } else if (ch == '\\') {
      let tmp = dr
      dr = dc
      dc = tmp
      key = [r, c, dr, dc].join(':') 
      if (!seen.has(key)) {
        seen.add(key)
        q.push(key.split(':').map(Number))
      }
    } else {
      let dirs = ch == "|" ? [[1, 0], [-1, 0]] : [[0, 1], [0, -1]];
      for (let [dr, dc] of dirs) {
        key =  key = [r, c, dr, dc].join(':')
        if (!seen.has(key)) {
          seen.add(key)
          q.push(key.split(':').map(Number)) // to keep immutability
        }
      }
    }
  }

  let coords = new Set(Array.from(seen).map(vec => {
    let [r, c]= vec.split(':')
    return [r, c].join(':');
  }));
  return coords.size
}

const part1 = (data: string) => {
  grid = getGrig(data);
  return calc(0, -1, 0, 1);
}

const part2 = (data: string) => {
  grid = getGrig(data);
  let maxEnergy = 0;
  for (let r=0; r < grid.length; r++) {
    maxEnergy = Math.max(maxEnergy, calc(r, -1, 0, 1))
    maxEnergy = Math.max(maxEnergy, calc(r, grid[0].length, 0, -1))
  }
  for (let c=0; c < grid[0].length; c++) {
    maxEnergy = Math.max(maxEnergy, calc(-1, c, 1, 0))
    maxEnergy = Math.max(maxEnergy, calc(grid.length, c, -1, 0))
  }
  return maxEnergy;
}

export const solve: Solution = (source) => {
  title("Day 16: The Floor Will Be Lava");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
