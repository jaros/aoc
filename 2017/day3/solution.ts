
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let dist = Number(data);

  let currSide = 1;
  let lastLoopSize = currSide * currSide;
  let centricDistance = 0;
  while (lastLoopSize < dist) {
    currSide += 2
    lastLoopSize = currSide * currSide;
    centricDistance++;
  }

  let diff = (lastLoopSize - dist);
  let maxPerimDist = Math.floor(currSide / 2);

  let sideSteps = diff % (currSide - 1); // subtract corners cause they counted in each side 2 times (overlap).

  let perimDist = -1;
  if (sideSteps > currSide / 2) { // more then middle
    perimDist = maxPerimDist - (currSide - sideSteps);
  } else { // less then middle
    perimDist = maxPerimDist - sideSteps;
  }

  let shortestPath = perimDist + centricDistance;

  return shortestPath;
}

function* sumSpiral(): Generator<number> {
  let a: { [key: string]: number } = { '0,0': 1 };
  let i = 0,
    j = 0;

  const sn = (i: number, j: number): number =>
    Array.from({ length: 3 }, (_, k) =>
      Array.from({ length: 3 }, (_, l) => a[`${i - 1 + k},${j - 1 + l}`] || 0).reduce(
        (acc, val) => acc + val,
        0
      )
    ).reduce((acc, row) => acc + row, 0);

  for (let s = 1; ; s += 2) {
    for (let _ = 0; _ < s; _++) {
      i++;
      a[`${i},${j}`] = sn(i, j);
      yield a[`${i},${j}`];
    }
    for (let _ = 0; _ < s; _++) {
      j--;
      a[`${i},${j}`] = sn(i, j);
      yield a[`${i},${j}`];
    }
    for (let _ = 0; _ < s + 1; _++) {
      i--;
      a[`${i},${j}`] = sn(i, j);
      yield a[`${i},${j}`];
    }
    for (let _ = 0; _ < s + 1; _++) {
      j++;
      a[`${i},${j}`] = sn(i, j);
      yield a[`${i},${j}`];
    }
  }
}

const part2 = (data: string) => {
  let dist = Number(data);
  const spiralGen = sumSpiral();
  let x: number | undefined = spiralGen.next().value;
  while (x !== undefined && x <= dist) {
    x = spiralGen.next().value;
  }
  return x!;
}

export const solve: Solution = (source) => {
  title("Day 1: Corruption Checksum");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  // withTime(part2)(data);
};
