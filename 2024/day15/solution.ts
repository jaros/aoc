import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Pos = [number, number];

const part1 = (data: string) => {
  let [map, moves] = data.split("\n\n");
  moves = moves.split("\n").join("");

  let grid = map.split("\n").map((line) => line.split(""));
  let n = grid.length;
  let m = grid[0].length;

  let findStart = (): Pos => {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (grid[r][c] == "@") {
          return [r, c];
        }
      }
    }
    return [-1, -1];
  };

  let robPos = findStart();

  const stepMap: Record<string, Pos> = {
    "<": [0, -1],
    ">": [0, 1],
    "^": [-1, 0],
    v: [1, 0],
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
  let ans = 0;
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 15: Warehouse Woes");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
