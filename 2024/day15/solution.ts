import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Pos = [number, number];

let findStart = (grid: string[][]): Pos => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] == "@") {
        return [r, c];
      }
    }
  }
  return [-1, -1];
};

const part1 = (data: string) => {
  let [map, moves] = data.split("\n\n");
  moves = moves.split("\n").join("");

  let grid = map.split("\n").map((line) => line.split(""));
  let n = grid.length;
  let m = grid[0].length;

  let robPos = findStart(grid);

  const stepMap: Record<string, Pos> = {
    "<": [0, -1],
    ">": [0, 1],
    "^": [-1, 0],
    "v": [1, 0],
  };

  let moveBox = (boxPos: Pos, dir: Pos): boolean => {
    let [dR, dC] = dir;
    let nR = boxPos[0] + dR;
    let nC = boxPos[1] + dC;
    if (nR < 0 || nR >= n || nC < 0 || nC >= m) {
      return false;
    }
    let val = grid[nR][nC];
    if (val == "#") {
      return false;
    }
    if (val == ".") {
      grid[nR][nC] = "O";
      grid[boxPos[0]][boxPos[1]] = ".";
      return true;
    }
    if (val == "O") {
      let hasMoved = moveBox([nR, nC], dir);
      if (hasMoved) {
        grid[nR][nC] = "O";
        grid[boxPos[0]][boxPos[1]] = ".";
      }
      return hasMoved;
    }
    return false;
  };

  let pringGrid = () => {
    for (let row of grid) {
      console.log(row.join(""));
    }
  };

  for (let step of moves) {
    let [dR, dC] = stepMap[step];
    let nR = robPos[0] + dR;
    let nC = robPos[1] + dC;
    if (nR < 0 || nR >= n || nC < 0 || nC >= m) {
      continue;
    }
    let val = grid[nR][nC];
    if (val == "#") {
      continue;
    }
    if (val == "O") {
      if (moveBox([nR, nC], [dR, dC])) {
        // if bax has been moved at least once
        grid[nR][nC] = "@";
        grid[robPos[0]][robPos[1]] = ".";
        robPos = [nR, nC];
      }
    } else {
      // can just move
      grid[nR][nC] = "@";
      grid[robPos[0]][robPos[1]] = ".";
      robPos = [nR, nC];
    }
    // pringGrid();
  }

  let ans = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] == 'O') {
        ans += 100 * r + c;
      }
    }
  }
  return ans;
};

const part2 = (data: string) => {
  let [map, moves] = data.split("\n\n");
  moves = moves.split("\n").join("");

  let expansion: Record<string, string> = {
     "#": "##",
     "O": "[]",
     ".": "..",
     "@": "@."
  }

  let expand = (s: string): string => expansion[s];

  let grid = map.split("\n").map((line) => line.split("").map(expand).join("").split(""));
  let n = grid.length;
  let m = grid[0].length;

  let robPos = findStart(grid);

  const stepMap: Record<string, Pos> = {
    "<": [0, -1],
    ">": [0, 1],
    "^": [-1, 0],
    v: [1, 0],
  };

  const getTargets = (robPos: Pos, [dr, dc]: Pos): Pos[]| null => {
    const [r,c] = robPos
    let targets: Pos[] = [[r,c]]
    let go = true

    let i = 0
    let targetsLen = 1
    while (i < targetsLen) {
      let [cr, cc] = targets[i++];
      let nr = cr + dr;
      let nc = cc + dc;
      if (targets.some(([r, c]) => r == nr  && c == nc)) {
        continue;
      }
      let char = grid[nr][nc]
      if (char == "#") {
        return null;
      }
      if (char == "[") {
        targets.push([nr, nc])
        targets.push([nr, nc + 1])
        targetsLen += 2
      }
      if (char == "]") {
        targets.push([nr, nc])
        targets.push([nr, nc - 1])
        targetsLen += 2
      }
    }
    return targets;
  }

  for (let step of moves) {
    let [dr, dc] = stepMap[step];
    const [r,c] = robPos
    
    const targets = getTargets(robPos, [dr, dc]);

    if (targets == null) {
      continue; // no move
    }

    let copy = grid.map(r => [...r]);

    grid[r][c] = '.'
    grid[r + dr][c + dc] = '@'

    for (let i=1; i<targets.length; i++) {
      let [br, bc] = targets[i];
      grid[br][bc] = '.'
    }
    for (let i=1; i<targets.length; i++) {
      let [br, bc] = targets[i];
      grid[br+dr][bc+dc] = copy[br][bc]
    }

    robPos = [r + dr, c + dc];
  }

  let ans = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] == '[') {
        ans += 100 * r + c;
      }
    }
  }
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 15: Warehouse Woes");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
