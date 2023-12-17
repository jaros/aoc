
import { Solution, readInput, title, withTime } from "../../common/types";
import { PriorityQueue } from "../utils";

const part1 = (data: string) => {
  let grid: number[][] = data.split('\n').map(line => line.trim().split('').map(Number))

  const seen = new Set();
  const pq = new PriorityQueue();
  pq.push([0, 0, 0, 0, 0, 0]);

  while (!pq.isEmpty()) {
    const [hl, r, c, dr, dc, n] = pq.pop()!;

    if (r === grid.length - 1 && c === grid[0].length - 1) {
      return hl;
    }

    if (seen.has(`${r}-${c}-${dr}-${dc}-${n}`)) {
      continue;
    }

    seen.add(`${r}-${c}-${dr}-${dc}-${n}`);

    if (n < 3 && (dr !== 0 || dc !== 0)) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
      }
    }

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [ndr, ndc] of directions) {
      if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
        const nr = r + ndr;
        const nc = c + ndc;
        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
          pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
        }
      }
    }
  }
  return 0;
}

const part2 = (data: string) => {
  let grid: number[][] = data.split('\n').map(line => line.trim().split('').map(Number))

  const seen = new Set();
  const pq = new PriorityQueue();
  pq.push([0, 0, 0, 0, 0, 0]);

  while (!pq.isEmpty()) {
    const [hl, r, c, dr, dc, n] = pq.pop()!;

    if (r === grid.length - 1 && c === grid[0].length - 1 && n >= 4) {
      return hl;
    }

    if (seen.has(`${r}-${c}-${dr}-${dc}-${n}`)) {
      continue;
    }

    seen.add(`${r}-${c}-${dr}-${dc}-${n}`);

    if (n < 10 && (dr !== 0 || dc !== 0)) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
      }
    }

    if (n >= 4 || (dr == 0 && dc == 0)) {
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [ndr, ndc] of directions) {
        if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
          const nr = r + ndr;
          const nc = c + ndc;
          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
            pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
          }
        }
      }
    }
  }
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 17: Clumsy Crucible");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
