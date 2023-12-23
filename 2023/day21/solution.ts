import { Solution, readInput, title, withTime } from "../../common/types";

let encode = ([r, c]: number[]) => `${r},${c}`;

const part1 = (data: string) => {
  const grid = data.split('\n').map(r => r.split(''));

  let start = grid.reduce((prev, row, rIdx) => prev[1] != -1 ? prev : [rIdx, row.findIndex(c => c == 'S')], [-1, -1]);
  console.log(start)

  let ans = new Set();
  let seen = new Set([encode(start)]);
  let q = [[...start, 64]];

  while (q.length > 0) {
    let [r, c, s] = q.shift()!;
    if (s % 2 == 0) {
      ans.add(encode([r, c]))
    }
    if (s == 0) {
      continue;
    }
    for (let [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
      let nKey = encode([nr, nc]);
      if (nr < 0 || nr > grid.length || nc < 0 || nc > grid[0].length || grid[nr][nc] == '#' || seen.has(nKey)) {
        continue;
      }
      seen.add(nKey);
      q.push([nr, nc, s - 1]);
    }
  }
  return ans.size;
};

const part2 = (data: string) => {
  const grid = data.split('\n').map(r => r.split(''));

  let fill = (sr: number, sc: number, ss: number) => {
    let ans = new Set();
    let seen = new Set([encode([sr, sc])]);
    let q = [[sr, sc, ss]];

    while (q.length > 0) {
      let [r, c, s] = q.shift()!;
      if (s % 2 == 0) {
        ans.add(encode([r, c]))
      }
      if (s == 0) {
        continue;
      }
      for (let [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
        let nKey = encode([nr, nc]);
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length || grid[nr][nc] == '#' || seen.has(nKey)) {
          continue;
        }
        seen.add(nKey);
        q.push([nr, nc, s - 1]);
      }
    }
    return ans.size;
  }

  let [sr, sc] = grid.reduce((prev, row, rIdx) => prev[1] != -1 ? prev : [rIdx, row.findIndex(c => c == 'S')], [-1, -1]);

  if (grid.length != grid[0].length) {
    throw new Error('not square')
  }

  let len = grid.length;
  if (sc != sr || sc != Math.floor(len / 2)) {
    throw new Error('not in center')
  }

  const steps = 26501365;

  if (steps % len != Math.floor(len / 2)) {
    throw new Error('steps are not correlated with grid size')
  }

  let grid_width = Math.floor(steps / len) - 1;
  let odd_root = Math.floor(grid_width / 2) * 2 + 1;
  let odd = odd_root * odd_root;
  let even_root = Math.floor((grid_width + 1) / 2) * 2;
  let even = even_root * even_root;

  let odd_points = fill(sr, sc, len * 2 + 1)
  let even_points = fill(sr, sc, len * 2)

  let conrner_t = fill(len - 1, sc, len - 1)
  let conrner_r = fill(sr, 0, len - 1)
  let conrner_b = fill(0, sc, len - 1)
  let conrner_l = fill(sr, len - 1, len - 1)

  let small_tr = fill(len - 1, 0, Math.floor(len / 2) - 1)
  let small_tl = fill(len - 1, len - 1, Math.floor(len / 2) - 1)
  let small_br = fill(0, 0, Math.floor(len / 2) - 1)
  let small_bl = fill(0, len - 1, Math.floor(len / 2) - 1)

  let large_tr = fill(len - 1, 0, Math.floor(len * 3 / 2) - 1)
  let large_tl = fill(len - 1, len - 1, Math.floor(len * 3 / 2) - 1)
  let large_br = fill(0, 0, Math.floor(len * 3 / 2) - 1)
  let large_bl = fill(0, len - 1, Math.floor(len * 3 / 2) - 1)


  let result =
    odd * odd_points +
    even * even_points +
    conrner_t + conrner_r + conrner_b + conrner_l +
    (grid_width + 1) * (small_tr + small_tl + small_br + small_bl) +
    grid_width * (large_tr + large_tl + large_br + large_bl)

  return result;
};

export const solve: Solution = (source) => {
  title("Day 21: Step Counter");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
