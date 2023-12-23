import { Solution, readInput, title, withTime } from "../../common/types";

const dirs: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

type Point = { r: number, c: number };

let encode = (p: Point) => `${p.r}:${p.c}`;
let decode = (p: string): Point => {
 let [r, c] = p.split(':').map(Number);
 return {r,c};
};

type Way = {
  seen: Set<string>;
  current: Point;
}

const steepSlopes = ['^', '>', 'v', '<'];
const mapSlopes: Record<string, number[]> = {
  '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1]
}

const part1 = (data: string) => {
  let grid: string[][] = data.split('\n').map(row => row.split(''));
  let len = grid.length;

  let start = { r: 0, c: grid[0].findIndex(c => c == '.') };
  let finish = { r: len - 1, c: grid[len - 1].findIndex(c => c == '.') };
  let isFinish = (point: Point) => point.r == finish.r && point.c == finish.c;

  let canMove = (nP: Point, seen: Set<string>) => {
    let next = grid[nP.r][nP.c];
    if (steepSlopes.includes(next)) {
      let [dr, dc] = mapSlopes[next];
      return !seen.has(encode({r: nP.r + dr, c: nP.c + dc}));
    }
    return next != '#'
  }

  // starting point is not counted

  let dfs = (current: Point, path: Set<string>): number => {
    if (isFinish(current)) {
      return path.size;
    }
    let neighborsPaths = [];
    for (let [dr, dc] of dirs) {
      let nP = { r: current.r + dr, c: current.c + dc };
      // let nr = current.r + dr;
      // let nc = current.c + dc;
      let key = encode(nP);
      if (nP.r >= 0 && nP.r < len && nP.c >= 0 && nP.c < len && !path.has(key) && canMove(nP, path)) {
        let nSeen = new Set(path);
        nSeen.add(key)
        neighborsPaths.push(dfs(nP, nSeen));
      }
    }
    return Math.max(...neighborsPaths)
  }
  return dfs(start, new Set());
};

const part2 = (data: string) => {
  let grid: string[][] = data.split('\n').map(row => row.split(''));
  let len = grid.length;

  let start = { r: 0, c: grid[0].findIndex(c => c == '.') };
  let finish = { r: len - 1, c: grid[len - 1].findIndex(c => c == '.') };
  let isFinish = (point: Point) => point.r == finish.r && point.c == finish.c;
  let canMove = (r: number, c: number) => grid[r][c] != '#';

  // using contraction poitns
  let points: string[] = [encode(start), encode(finish)];

  for (let r = 0; r < len; r++) {
    for (let c = 0; c < len; c++) {

      if (grid[r][c] == '#') {
        continue;
      }
      let neighbors = 0;
      for (let [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;
        if (nr >= 0 && nr < len && nc >= 0 && nc < len && canMove(nr, nc)) {
          neighbors++;
        }
      }
      if (neighbors >= 3) {
        points.push(encode({ r, c }))
      }
    }
  }

  // console.log(points)

  let graph: Record<string, Record<string, number>> = Object.fromEntries(points.map(pt => [pt, {} as Record<string, number>]));

  for (let pt of points) {
    let {r: sr, c: sc} = decode(pt);
    let stack = [[0, sr, sc]]; // first time n=0
    let edgeKey = encode({r: sr, c: sc});
    let seen = new Set([edgeKey]);

    while (stack.length > 0) {
      let [n, r, c] = stack.pop()!
      if (n != 0 && points.includes(encode({r,c}))) {
        graph[edgeKey][encode({r,c})] = n
        continue;
      }
      for (let [dr, dc] of dirs) {
        let nr = r + dr
        let nc = c + dc
        let newKey = encode({r: nr, c: nc})
        if (nr >= 0 && nr < len && nc >= 0 && nc < len && canMove(nr, nc) && !seen.has(newKey)) {
          stack.push([n+1, nr, nc])
          seen.add(newKey)
        }
      }
    }
  }
  // console.log(graph)

  let seen = new Set<string>();

  let dfs = (pt: Point): number => {
    if (isFinish(pt)) {
      return 0;
    }

    let m = Number.NEGATIVE_INFINITY;
    let ptKey = encode(pt);
    seen.add(ptKey)
    for (let nx in graph[ptKey] ) {
      if (!seen.has(nx))
        m = Math.max(m, dfs(decode(nx)) + graph[ptKey][nx])
    }
    seen.delete(ptKey)
    return m;
  }
  
  return dfs(start);
};

export const solve: Solution = (source) => {
  title("Day 23: A Long Walk");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
