
import { Solution, readInput, title, withTime } from "../../common/types";

let dirs: Record<string, number[]> = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
};

const part1 = (data: string) => {
  let points = [[0, 0]];

  let b=0; // boundary points
  for (let line of data.split('\n')) {
    let [d, steps] = line.trim().split(' ');
    let n = Number(steps);
    b += n;
    let [dx, dy] = dirs[d];
    let [r, c] = points[points.length - 1];
    points.push([r + dx * n, c + dy * n]);
  }

  // console.log( points.length, (-1 + points.length) % points.length, points[(-1 + points.length) % points.length]);

  let sum = 0;
  for (let i = 0; i < points.length - 1; i++) {
    sum += points[i][0] * (points[(i-1 + points.length) % points.length][1] - points[(i+1) % points.length][1]) 
  }
  let A = Math.abs(sum) / 2;
  let i = A - b/2 + 1;
  // console.log(A, b);

  return i + b;
}

const part2 = (data: string) => {
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 18: Lavaduct Lagoon");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  // withTime(part2)(data);
};
