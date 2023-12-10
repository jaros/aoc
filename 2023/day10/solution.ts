
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
    // console.log("checking", adjVal, "to", to)
    if (adjVal && arePipesMatch(to, currVal, adjVal) && !isSamePos(adjPos, prev)) {
      return adjPos;
    }
  }
  console.log(curr, currVal)
  throw new Error('no adjacent pipe found')
}

let findStartNext = (start: Pos, m: string[][]) => {
  let twoAdjacents: Pos[] = [];

  // check from south-to-x => i direction is inversed to y 
  let adjPos = {i: start.i + 1, j: start.j};
  let adjVal = m[adjPos.i][adjPos.j];
  if (adjVal == '|' || adjVal == 'L' || adjVal == 'J') {
    twoAdjacents.push({i: adjPos.i, j: adjPos.j});
  }


  // check from west-to-x
  adjPos = {i: start.i, j: start.j + 1};
  adjVal = m[adjPos.i][adjPos.j];
  if (adjVal == '-' || adjVal == 'J' || adjVal == '7') {
    twoAdjacents.push({i: adjPos.i, j: adjPos.j});
  }


  // check from north-to-x
  adjPos = {i: start.i - 1, j: start.j};
  adjVal = m[adjPos.i][adjPos.j];
  if (adjVal == '|' || adjVal == '7' || adjVal == 'F') {
    twoAdjacents.push({i: adjPos.i, j: adjPos.j});
  }

  // check from east-to-x
  adjPos = {i: start.i, j: start.j - 1};
  adjVal = m[adjPos.i][adjPos.j];
  if (adjVal == '-' || adjVal == 'L' || adjVal == 'F') {
    twoAdjacents.push({i: adjPos.i, j: adjPos.j});
  }

  console.log("twoAdjacents", twoAdjacents)

  if (twoAdjacents.length !== 2) {
    throw new Error('NOT TWO adjacents at start');
  }
  return twoAdjacents[1];
}

const part1 = (data: string) => {
  let maze: string[][] = parseInput(data)
  let start: Pos = findStartPos(maze);
  console.log("start", start)

  let nextToStart = findStartNext(start, maze);
  let steps = 1;
  let prev: Pos = start;
  let curr: Pos = nextToStart;
  console.log("nextToStart", maze[curr.i][curr.j], curr)
  do {
    let tmp = curr;
    curr = next(curr, prev, maze);
    // console.log("next", maze[curr.i][curr.j], curr)
    prev = tmp;
    steps++;
  } while (!isSamePos(curr, start))

  return Math.floor(steps/2);
}

const part2 = (data: string) => {
  return 0;
}


export const solve: Solution = (source) => {
  title("Day 10: Pipe Maze");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
