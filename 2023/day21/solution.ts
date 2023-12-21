import { Solution, readInput, title, withTime } from "../../common/types";

const dirs = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
];

let findStart = (grid: string[]) => {
  for (let r=0; r < grid.length; r++) {
    for (let c=0; c < grid[r].length; c++) {
      if (grid[r][c] === 'S') {
        return [r, c];
      }
    }
  }
  throw new Error('No start found');
}

let canMove = (grid: string[], dr: number, dc: number) => {

}

const part1 = (data: string) => {
  // console.log(data);
  const grid = data.split('\n');

  let findStart = () => {
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

  let printGrid = (positions: number[][]) => {
    let gridCopy = grid.map(r => r.split(''));
    for (let [r, c] of positions) {
      gridCopy[r][c] = 'O';
    }
    console.log(gridCopy.map(r => r.join('')).join('\n'));
  }

  let start = findStart();

  let encode = ([r, c]: number[]) => `${r},${c}`;
  let decode = (s: string) => s.split(',').map(Number);

  let positions: number[][] = [start];
  let seen: Set<string> = new Set([encode(start)]);

  for (let i=0; i < 64; i++) {
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
