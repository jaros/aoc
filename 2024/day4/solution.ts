import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => data.split("\n");

// const searchWord = "XMAS";

const pattern = /XMAS/g;

const sum = (a: number, b: number) => a + b;

const countBiDirect = (s: string) => (s.match(pattern)?.length ?? 0) + (s.split('').reverse().join('').match(pattern)?.length ?? 0);

function extractDiagonals(squareArray: string[]) {
  const n = squareArray.length; // Length of the square array
  const diagonals = [];

  // Extract all primary diagonals (top-left to bottom-right)
  for (let d = 1 - n; d < n; d++) {
      let primaryDiagonal = "";
      for (let i = 0; i < n; i++) {
          const j = i + d; // Adjust column index based on diagonal offset
          if (j >= 0 && j < n) {
              primaryDiagonal += squareArray[i][j];
          }
      }
      if (primaryDiagonal) diagonals.push(primaryDiagonal);
  }

  // Extract all secondary diagonals (top-right to bottom-left)
  for (let d = 0; d < 2 * n - 1; d++) {
      let secondaryDiagonal = "";
      for (let i = 0; i < n; i++) {
          const j = d - i; // Adjust column index based on diagonal offset
          if (j >= 0 && j < n) {
              secondaryDiagonal += squareArray[i][j];
          }
      }
      if (secondaryDiagonal) diagonals.push(secondaryDiagonal);
  }

  return diagonals;
}

const countTimes = (board: string[]): number => {
  let rows = board;
  let cols: string[] = [];
  for (let i=0; i < board[0].length; i++) {
    let col = "";
    for (let j=0; j < board.length; j++) {
      col += board[j][i];
    }
    cols.push(col);
  }

  let diagonals = extractDiagonals(board);

  // console.log(diagonals)
  // console.log(rows)
  // console.log(cols)

  let rCounts = rows.map(countBiDirect).reduce(sum, 0);
  let cCounts = cols.map(countBiDirect).reduce(sum, 0);
  let dCounts = diagonals.map(countBiDirect).reduce(sum, 0);

  return rCounts + cCounts + dCounts;
}

const part1 = (data: string) => {
  let lines = parseInput(data);
  return countTimes(lines);
};

const part2 = (data: string) => {
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 4: Ceres Search");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
