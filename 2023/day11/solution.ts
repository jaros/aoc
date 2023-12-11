
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

const getGrid = (data: string) : string[][] => {
  return data.split('\n').map(r => r.split(''));
}

type Loc = [number, number];

const part1 = (data: string) => {
  // console.log(data)
  let grid = getGrid(data);
  let doubledRows = new Set<number>();
  let doubledCols = new Set<number>();

  for (let i=0; i < grid.length; i++) {
    if (grid[i].every(c => c == '.')) {
      doubledRows.add(i);
    }
  }

  let cols = [];
  for (let j = 0; j < grid[0].length; j++) {
    cols.push(grid.map(row => row[j]));
    if (cols[j].every(r => r == '.')) {
      doubledCols.add(j);
    }
  }

  let galaxies: Array<Loc> = [];
  for (let i=0; i < grid.length; i++) {
    for (let j=0; j < grid[i].length; j++) {
      if (grid[i][j] == '#') {
        galaxies.push([i, j]);
      }
    }
  }
  console.log(galaxies.length)

  // find pairs
  let pairs: Array<[Loc, Loc]> = [];
  for (let n = 0; n < galaxies.length; n++) {
    for (let m = n+1; m < galaxies.length; m++) {
      pairs.push([galaxies[m], galaxies[n]]);
    }
  }
  console.log(pairs.length)

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
      steps++;
      if (doubledRows.has(i)) {
        steps++;
      }
    }

    while(j < jEnd) {
      j++;
      steps++;
      if (doubledCols.has(j)) {
        steps++;
      }
    }
    distances.push(steps);
  }
  return distances.reduce(sum);
}

const part2 = (data: string) => {
  return 0;
}


export const solve: Solution = (source) => {
  title("Day 11: Cosmic Expansion");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
