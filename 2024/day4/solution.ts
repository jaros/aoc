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

  let rCounts = rows.map(countBiDirect).reduce(sum, 0);
  let cCounts = cols.map(countBiDirect).reduce(sum, 0);
  let dCounts = diagonals.map(countBiDirect).reduce(sum, 0);

  return rCounts + cCounts + dCounts;
}

const part1 = (data: string) => {
  let lines = parseInput(data);
  return countTimes(lines);
};

const countTimesX = (board: string[]): number => {
  let count = 0;

  let check = (rIdx: number, cIdx: number): number => {
    let lr = (board[rIdx][cIdx] == 'M' && board[rIdx+1][cIdx+1] == 'A' && board[rIdx+2][cIdx+2] == 'S')
    ||
    (board[rIdx][cIdx] == 'S' && board[rIdx+1][cIdx+1] == 'A' && board[rIdx+2][cIdx+2] == 'M');
    let rl = (board[rIdx][cIdx+2] == 'M' && board[rIdx+1][cIdx+1] == 'A' && board[rIdx+2][cIdx] == 'S')
    ||
    ((board[rIdx][cIdx+2] == 'S' && board[rIdx+1][cIdx+1] == 'A' && board[rIdx+2][cIdx] == 'M'));
    return (lr && rl) ? 1 : 0;
  }

  for (let r=0; r < board.length-2; r++) {
    for (let c=0; c < board.length-2; c++) {
      // get 3x3 square and count and add to result
      count += check(r, c)
    }
  }
  return count;
}

const part2 = (data: string) => {
  return countTimesX(parseInput(data));
};

export const solve: Solution = (source) => {
  title("Day 4: Ceres Search");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
