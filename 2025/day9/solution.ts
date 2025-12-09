import { e, number, re, to } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Dot = [x: number, y: number];
type Line = { a: Dot; b: Dot };

const getDots = (data: string): { dots: Dot[]; X: number; Y: number } => {
  let X = 0;
  let Y = 0;
  const dots = data.split("\n").map((l) => {
    const [x, y] = l.split(",").map(Number);
    X = Math.max(X, x);
    Y = Math.max(Y, y);
    return [x, y] as Dot;
  });
  return { dots, X, Y };
};

const surface = ([x1, y1]: Dot, [x2, y2]: Dot): number => {
  return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
};

const part1 = (data: string) => {
  const { dots } = getDots(data);
  let max = 0;
  // console.log(surface(dots[5], dots[3]))
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      max = Math.max(max, surface(dots[i], dots[j]));
    }
  }
  // console.log(lines)
  return max;
};

const adjacentDeltas: Dot[] = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

const findPerimeter = (
  // X: number,
  // Y: number,
  dots: Dot[]
): Line[] => {
  // const isOutOfBounds = (row: number, col: number) =>
  //   row < 0 || row >= Y || col < 0 || col >= X;

  const toDotStr = (dot: Dot) => `${dot[0]},${dot[1]}`;

  const dotSet = new Set<string>();
  const xAxis: Map<number, Set<number>> = new Map();
  const yAxis: Map<number, Set<number>> = new Map();
  for (let [x, y] of dots) {
    dotSet.add(toDotStr([x, y]));
    
    let yy = xAxis.get(x) ?? new Set<number>();
    yy.add(y)
    xAxis.set(x, yy);

    let xx = yAxis.get(y) ?? new Set<number>();
    xx.add(x);
    yAxis.set(y, xx);
  }
  // console.log()


  let isLoop = false;

  // const checkDir = (start: Dot, dir: Dot): Dot | null => {
  //   let [currCol, currRow] = start;
  //   const [dCol, dRow] = dir;
  //   while (!isOutOfBounds(currRow, currCol)) {
  //     currCol += dCol;
  //     currRow += dRow;
  //     const currDot = toDotStr([currCol, currRow]);
  //     if (dotSet.has(currDot)) {
  //       //!isOutOfBounds(currRow, currCol) && board[currRow][currCol] == "#") {
  //       if (!scanned.has(currDot)) {
  //         return [currCol, currRow];
  //       } else if (dots.length - 1 == scanned.size) {
  //         isLoop = true;
  //         // console.log("found loop", currCol, currRow)
  //         return [currCol, currRow];
  //       }
  //     }
  //   }
  //   return null;
  // };

  const findNeighbor = (startDot: Dot, prev: Dot | null): { next: Dot; } | null => {
    const [x, y] = startDot;
    let prevDotStr = prev ? toDotStr(prev) : null;
    const yy: Set<number> = xAxis.get(x)!;
    for (let nY of yy) {
      if (nY != y) {
        let dotStr = toDotStr([x, nY]);
        if (!scanned.has(dotStr)) {
          return { next: [x, nY] };
        } else if (prevDotStr != dotStr) { // dots.length - 1 == scanned.size
          isLoop = true;
          return { next: [x, nY] };
        }
      }
    }

    const xx: Set<number> = yAxis.get(y)!;
    for (let nX of xx) {
      if (nX != x) {
        let dotStr = toDotStr([nX, y]);
        if (!scanned.has(dotStr)) {
          return {next: [nX, y]};
        } else if ( prevDotStr != dotStr) { // last one goes back - dots.length - 1 == scanned.size
          isLoop = true;
          return {next: [nX, y]};
        }
      }
    }

    // for (const delta of adjacentDeltas) {
    //   let next = checkDir(startDot, delta);
    //   if (next != null) {
    //     return { next };
    //   }
    // }

    return null;
  };



  let prev: Dot | null = null;
  let current = dots[0];
  const scanned = new Set<string>();
  const lines: Line[] = [];
  while (!isLoop) {
    let neighbor = findNeighbor(current, prev);

    if (neighbor == null) {
      throw new Error("failed to find neighbor for " + toDotStr(current));
    }
    const { next } = neighbor;
    // console.log("found next", current, "->", next);
    // save line
    lines.push({ a: current, b: next });
    scanned.add(toDotStr(current));
    if (scanned.has(toDotStr(next))) {
      isLoop = true;
    }
    prev = current;
    current = next;
  }

  return lines;
};

const isWithinPerimeter = (perimeter: Line[], rect: {a: Dot, b: Dot}): boolean => {
  const isOK = perimeter.every(line => {
    return true;
  });
  return isOK;
};

const part2 = (data: string) => {
  const { dots, X, Y } = getDots(data);
  let board = Array.from({ length: Y + 1 }, () => Array(X + 1).fill("."));
  for (let [x, y] of dots) {
    board[y][x] = "#";
  }
  console.log(board.map((row) => row.join("")).join("\n"));
  const perimeter = findPerimeter(dots); // X + 1, Y + 1, 
  console.log("perimeter.len", perimeter.length)

  for (let line of perimeter) {
    const {
      a: [x1, y1],
      b: [x2, y2]
    } = line; // Dot: col, row
    // console.log("line:", line)
    if (x1 == x2) {
      // vertical line
      const dy = y2 > y1 ? 1 : -1;
      for (let i = 1; i < Math.abs(y2 - y1); i++) {
        let row = y1 + i * dy;
        // console.log('set border', row, x1)
        board[row][x1] = "X";
      }
    } else if (y1 == y2) {
      // horizontal line
      const dx = x2 > x1 ? 1 : -1;
      for (let i = 1; i < Math.abs(x2 - x1); i++) {
        let col = x1 + i * dx;
        board[y1][col] = "X";
      }
    }
  }
  console.log("->");
  console.log(board.map((row) => row.join("")).join("\n"));

  let max = 0;
  // console.log(surface(dots[5], dots[3]))
  for (let i=0; i< dots.length; i++) {
    for (let j=i+1; j < dots.length; j++) {
      if (isWithinPerimeter(perimeter, {a: dots[i], b: dots[j]})) {
        max = Math.max(max, surface(dots[i], dots[j]))
      }
    }
  }
  // console.log(lines)
  return max;
};

export const solve: Solution = (source) => {
  title("Day 9: Movie Theater");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
