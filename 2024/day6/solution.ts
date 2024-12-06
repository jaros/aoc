import { Solution, readInput, title, withTime } from "../../common/types";

const sum = (a: number, b: number) => a + b;

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

const findStart = (grid: string[]) => {
  let y=0;
  let x=0;
  for (let dy=0; dy < grid.length; dy++) {
    for (let dx=0; dx < grid[dy].length; dx++) {
      if (grid[dy][dx] == '^') {
        return [dy, dx];
      }
    }
  }
  return [];
}

let toStr = (y: number, x: number) => `${y},${x}`;
let toStrDir = (y: number, x: number, dirIdx: number) => `${y},${x},${dirIdx}`;

const movingDir = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1] // left
]

const getPath = (grid: string[]): Set<string> => {
  let start = findStart(grid);
  let path = new Set<string>();
  let [y, x] = start;
  

  let dirIdx = 0;
  let [dy, dx] = movingDir[dirIdx];

  while (y >=0 && y < grid.length && x >= 0 && x < grid[y].length) {
      path.add(toStr(y, x));
      let ny = y + dy;
      let nx = x + dx;
      let next = grid[ny]?.[nx];

      if (next == undefined) {
        break;
      }
 
      if (next == '#') {
        [dy, dx] = movingDir[(++dirIdx)%4]; // only switch direction, no moving position y,x
        continue;
      } else {
        y = ny;
        x = nx;
      }
  }
  return path;
}

const part1 = (data: string) => {
  const grid = parseInput(data);

  return getPath(grid).size;
};


const part2 = (data: string) => {
  const grid = parseInput(data);

  const start = findStart(grid);
  
  const [startY, startX] = start;
  let totalLoops = 0;

  const isLoopPossible = (tempGrid: string[]) => {
    let visited = new Set();
    let [y, x] = [startY, startX];
    let dirIdx = 0;
    let [dy, dx] = movingDir[dirIdx];

    while (y >= 0 && y < tempGrid.length && x >= 0 && x < tempGrid[y].length) {
      if (visited.has(toStrDir(y, x, dirIdx))) { // && y === startY && x === startX
        return true; // Loop detected
      }

      visited.add(toStrDir(y, x, dirIdx));
      let ny = y + dy;
      let nx = x + dx;
      let next = tempGrid[ny]?.[nx];

      if (next === undefined) {
        return false; // important to exit the check
      }

      if (next === "#") {
        dirIdx = (dirIdx + 1) % 4;
        [dy, dx] = movingDir[dirIdx]; // Change direction
        continue;
      }

      y = ny;
      x = nx;
    }

    return false; // No loop found
  };

  let path = getPath(grid);
  for (let pos of path) {
    let [y, x] = pos.split(",").map(Number);
    // Clone the grid and add a temporary obstacle
    let tempGrid = grid.map((row) => row.split(""));
    tempGrid[y][x] = "#";
    let tempGridStr = tempGrid.map((row) => row.join(""));

    // Check if adding this obstacle creates a loop
    if (isLoopPossible(tempGridStr)) {
      totalLoops++;
    }
  }

  return totalLoops;
};

export const solve: Solution = (source) => {
  title("Day 6: Guard Gallivant");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
