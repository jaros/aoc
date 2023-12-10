
import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) : string[][] => {
  return data.split("\n").map(line => line.split(""));
}

type Pos = {
  i: number; // row
  j: number; // col
}

let findStartPos = (m: string[][]) => {
  for (let i=0; i< m.length; i++) {
    for (let j=0; j < m[i].length; j++) {
      if (m[i][j] == 'S') {
        return {i, j};
      }
    }
  }
  throw new Error('start not found');
}

let isSamePos = (a: Pos, b: Pos) => a.i == b.i && a.j == b.j;

type Dir = 'N' | 'S' | 'E' | 'W'; 

const adjacents: Array<{adj: Pos, to: Dir}> = [
  {
    to: 'S', // ↓
    adj: {i: 1, j: 0},
  },
  {
    to: 'E', // →
    adj: {i: 0, j: 1},
  },
  {
    to: 'N', // ↑
    adj: {i: -1, j: 0},
  },
  {
    to: 'W', // ←
    adj: {i: 0, j: -1},
  }
];

let matchingPipes: Record<string, Record<string, string[]>> = { // to possible directions
  '|': {
    N: ['|', '7', 'F'], // ↑
    S: ['|', 'J', 'L'], // ↓
  },
  '-': {
    E: ['-', 'J', '7'], // →
    W: ['-', 'L', 'F'], // ←
  },
  'L': {
    E: ['-', 'J', '7'], // ↓→
    N: ['|', '7', 'F'] // ↑←
  },
  'J': {
    W: ['-', 'L', 'F'], // ←↓
    N: ['|', '7', 'F'], // →↑
  },
  '7': {
    W: ['-', 'L', 'F'], // ←↑
    S: ['|', 'J', 'L'], // →↓
  },
  'F': {
    E: ['-', 'J', '7'], // ↑→
    S: ['|', 'J', 'L'] // ↓←
  },
}

const toDirMatches: Record<Dir, string[]> = {
  N: ['|', 'L', 'J'],
  S: ['|', 'F', '7'],
  E: ['-', 'L', 'F'],
  W: ['-', '7', 'J'],
}

let arePipesMatch = (to: Dir, a: string, b: string): boolean => {
  if (b == '.') {
    return false;
  }
  if (b == 'S') {
    // can come only from 3 dirs
    return toDirMatches[to].includes(a);
  }

  return matchingPipes[a][to]?.includes(b) ?? false;
}

let next = (curr: Pos, prev: Pos, m: string[][]): Pos => {
  let currVal = m[curr.i][curr.j];

  for (let {adj, to} of adjacents) {
    let adjPos = {i: curr.i + adj.i, j: curr.j +adj.j};
    let adjVal = m[adjPos.i]?.[adjPos.j];
    if (adjVal && arePipesMatch(to, currVal, adjVal) && !isSamePos(adjPos, prev)) {
      return adjPos;
    }
  }
  console.log(curr, currVal)
  throw new Error('no adjacent pipe found')
}

let flipDir = (dir: Dir): Dir => {
  switch(dir) {
    case "E": return "W";
    case "W": return "E";
    case "S": return "N";
    case "N": return "S";
  }
}

let findStartNext = (start: Pos, m: string[][]) => {
  let twoAdjacents: Pos[] = [];

  for (let {to, adj} of adjacents) {
    let adjPos = {i: start.i + adj.i, j: start.j + adj.j};
    let adjVal = m[adjPos.i][adjPos.j];
    if (toDirMatches[flipDir(to)]?.includes(adjVal)) {
      twoAdjacents.push({i: adjPos.i, j: adjPos.j});
    }
  }
  if (twoAdjacents.length !== 2) {
    throw new Error('NOT TWO adjacents at start');
  }
  return twoAdjacents[0];
}


export const findLoop = (data: string): Pos[]  => {
  let maze: string[][] = parseInput(data)
  let start: Pos = findStartPos(maze);

  let nextToStart = findStartNext(start, maze);
  let steps = [];
  let prev: Pos = start;
  let curr: Pos = nextToStart;
  do {
    steps.push(prev);
    let tmp = curr;
    curr = next(curr, prev, maze);
    prev = tmp;
  } while (!isSamePos(curr, start))
  steps.push(prev);
  return steps;
}

const part1 = (data: string) => {
  return Math.floor(findLoop(data).length/2);
}

let getAreaMap = (
  input: string
): [string[][], Array<[number, number, number, number]>] => {

  const loop = findLoop(input);

  const loopTiles = new Set<string>(loop.map(({i, j}) => `${i}:${j}`));
  const loopEdges: Array<[number, number, number, number]> = [];

  const lines = parseInput(input);

  const result: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const l: string[] = [];

      for (let j = 0; j < line.length; j++) {
          const char = loopTiles.has(`${i}:${j}`) ? line[j] : '.';
          l.push(char);
      }

      result.push(l);
  }

  let prev = loop[loop.length - 1];
  for (const next of loop) {
      loopEdges.push([
          prev.i + 0.5,
          prev.j + 0.5,
          next.i + 0.5,
          next.j + 0.5
      ]);
      prev = next;
  }

  return [result, loopEdges];
}

let insideLoopTiles = (
  x: number,
  y: number,
  loopEdges: Array<[number, number, number, number]>
): number => {
  let intersections = 0;

  for (const [x1, y1, x2, y2] of loopEdges) {
      intersections += intersectEdges(x, y, 0, y, x1, y1, x2, y2);
  }

  return intersections % 2;
}

let intersectEdges = (
  p0_x: number,
  p0_y: number,
  p1_x: number,
  p1_y: number,
  p2_x: number,
  p2_y: number,
  p3_x: number,
  p3_y: number
): number => {
  const s1_x = p1_x - p0_x;
  const s1_y = p1_y - p0_y;
  const s2_x = p3_x - p2_x;
  const s2_y = p3_y - p2_y;

  const s =
      (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) /
      (-s2_x * s1_y + s1_x * s2_y);
  const t =
      (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) /
      (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      return 1;
  }

  return 0; // No collision
}

const part2 = (data: string) => {

  const [matrix, loopEdges] = getAreaMap(data);

  let counter = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '.') {
        counter += insideLoopTiles(i, j, loopEdges);
      }
    }
  }

  return counter;
}


export const solve: Solution = (source) => {
  title("Day 10: Pipe Maze");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
