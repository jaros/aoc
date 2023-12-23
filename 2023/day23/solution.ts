import { Solution, readInput, title, withTime } from "../../common/types";

const dirs: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

type Point = {r: number, c: number};

let encode = (r: number, c: number) => `${r}:${c}`;

type Way = {
  seen: Set<string>;
  path: Point[]
}

const steepSlopes = ['^', '>', 'v', '<'];
const mapSlopes: Record<string, number[]> = {
  '^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1]
}

const part1 = (data: string) => {
  let grid: string[][] = data.split('\n').map(row => row.split(''));
  let len = grid.length;

  let findS = (): Point => ({r: 0, c: grid[0].findIndex(c => c == '.')});
  let findF = (): Point => ({r: len-1, c: grid[len-1].findIndex(c => c == '.')});

  let start = findS();
  let finish = findF();

  let isFinish = (point: Point) => point.r == finish.r && point.c == finish.c;

  let canMove = (r: number, c: number, seen: Set<string>) => {
    let next = grid[r][c];
    if (steepSlopes.includes(next)) {
      let [dr, dc] = mapSlopes[next];
      return !seen.has(encode(r + dr, c + dc));
    }
    return next != '#' 
  }

  // starting point is not counted
  let q: Way[] = [{path: [start], seen: new Set<string>()}];

  let maxPath = 0;
  while (q.length > 0) { // BFS
    let {seen, path} = q.shift()!;
    let current = path[path.length-1];
    if (isFinish(current)) {
      maxPath = Math.max(maxPath, seen.size);
      continue;
    }

    for (let [dr, dc] of dirs) {
      let nr = current.r + dr;
      let nc = current.c + dc;
      let key = encode(nr, nc);
      if (nr >= 0 && nr < len && nc >= 0 && nc < len && !seen.has(key) && canMove(nr, nc, seen)) {
        let nPath: Point[] = [...path, {r: nr, c: nc}]
        let nSeen = new Set(seen);
        nSeen.add(key)
        q.push({path: nPath, seen: nSeen});
      }
    }
  }

  return maxPath;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 23: A Long Walk");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
