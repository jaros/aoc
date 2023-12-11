
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

const getGrid = (data: string) : string[][] => {
  return data.split('\n').map(r => r.split(''));
}

type Loc = [number, number];

const findNoGalaxiesAreas = (grid: string[][]) => {
  let freeRows = new Set<number>();
  let freeCols = new Set<number>();

  for (let i=0; i < grid.length; i++) {
    if (grid[i].every(c => c == '.')) {
      freeRows.add(i);
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    let col = grid.map(row => row[j]);
    if (col.every(r => r == '.')) {
      freeCols.add(j);
    }
  }
  return {freeRows, freeCols};
}

const getDistancsOfExpandingUniverse = (data: string, expansion: number) => {
  let grid = getGrid(data);

  let {freeRows, freeCols} = findNoGalaxiesAreas(grid);

  let galaxies: Array<Loc> = [];
  for (let i=0; i < grid.length; i++) {
    for (let j=0; j < grid[i].length; j++) {
      if (grid[i][j] == '#') {
        galaxies.push([i, j]);
      }
    }
  }
  // find pairs
  let pairs: Array<[Loc, Loc]> = [];
  for (let n = 0; n < galaxies.length; n++) {
    for (let m = n+1; m < galaxies.length; m++) {
      pairs.push([galaxies[m], galaxies[n]]);
    }
  }
  let distances: number[] = []
  for (let [from, to] of pairs) {
    let [i1, j1] = from;
    let [i2, j2] = to;
    let steps = 0;
    let iStart = Math.min(i1, i2);
    let iEnd = i1 == iStart ? i2 : i1;

    let jStart = Math.min(j1, j2);
    let jEnd = j1 == jStart ? j2 : j1;

    let i = iStart;
    let j = jStart;
    while(i < iEnd) {
      i++;
      if (freeRows.has(i)) {
        steps += (1 * expansion);
      } else {
        steps++;
      }
    }

    while(j < jEnd) {
      j++;
      if (freeCols.has(j)) {
        steps += (1 * expansion);
      } else {
        steps++;
      }
    }
    distances.push(steps);
  }
  return distances.reduce(sum);
}

const part1 = (data: string) => {
  // console.log(data)
  return getDistancsOfExpandingUniverse(data, 2);
}

const part2 = (data: string) => {
  return getDistancsOfExpandingUniverse(data, 1000000);
}


export const solve: Solution = (source) => {
  title("Day 11: Cosmic Expansion");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
