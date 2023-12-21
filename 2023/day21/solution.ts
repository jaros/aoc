import { Solution, readInput, title, withTime } from "../../common/types";

const dirs = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
];

let encode = ([r, c]: number[]) => `${r},${c}`;

const part1 = (data: string) => {
  // console.log(data);
  const grid = data.split('\n').map(r => r.split(''));

  let findStart = (): number[] => {
    for (let r=0; r < grid.length; r++) {
      for (let c=0; c < grid[r].length; c++) {
        if (grid[r][c] === 'S') {
          return [r, c];
        }
      }
    }
    throw new Error('No start found');
  }
  
  let canMove = ([r, c]: number[]) => {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[r].length) {
      return false;
    }
    return grid[r][c] !== '#';
  }

  let start = findStart();

  let positions: number[][] = [start];

  for (let i=0; i < 6; i++) {
    let nextPositions = [];
    let seen: Set<string> = new Set();
    while (positions.length > 0) { 
      let pos = positions.pop()!;
      for (let [dr, dc] of dirs) {
        let next = [pos[0] + dr, pos[1] + dc];
        let nextKey = encode(next);
        if (canMove(next) && !seen.has(nextKey)) {
          nextPositions.push(next);
          seen.add(nextKey);
        }
      }
    }
    positions = nextPositions;
  }

  // printGrid(positions);

  return positions.length;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 21: Step Counter");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
