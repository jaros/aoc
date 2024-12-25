import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

let toKey = (lengths: number[]) => lengths.join(',');

type Schema = {
  type: "key" | "lock",
  content: string[][],
  heights: number[],
  heightsKeys: string
}

const part1 = (data: string) => {
  let schemas: string[][][] = data.split("\n\n").map(schema => schema.split("\n").map(line => line.split("")));
  let locks: Schema [] = [];
  let keys: Schema[] = [];
  const HEIGHT = schemas[0].length; 
  const WIDTH = schemas[0][0].length;

  let shanpshotLock = (pattern: string[][]): number[] => {
    let res: number[] = new Array(WIDTH).fill(0);
    for (let c=0; c< WIDTH; c++) {
      for (let r=1; r < HEIGHT; r++) {
        if (pattern[r][c] != "#") {
          break;
        } else {
          res[c] += 1;
        }
      }     
    }
    return res;
  }

  let shanpshotKey = (pattern: string[][]): number[] => {
    let res: number[] = new Array(WIDTH).fill(0);
    for (let c=0; c < WIDTH; c++) {
      for (let r=HEIGHT-2; r > 0; r--) {
        // console.log(pattern[r][c])
        if (pattern[r][c] != "#") {
          break;
        } else {
          res[c] += 1;
        }
      }     
    }
    return res;
  }

  let isOverlap = (lock: Schema, key: Schema) => {
    for (let i=0; i < lock.heights.length; i++) {
      if (lock.heights[i] + key.heights[i] > HEIGHT-2) {
        return false;
      }
    }
    return true;
  }

  for (let sch of schemas) {
    if (sch[0].every(char => char == "#") && sch[HEIGHT-1].every(char => char == ".")) {
      
      let heights = shanpshotLock(sch);
      let key = toKey(heights);
      
      locks.push({
        type: "lock",
        content: sch,
        heights: heights,
        heightsKeys: key
      });
      // locksMem.add(key);
    }
    if (sch[0].every(char => char == ".") && sch[HEIGHT-1].every(char => char == "#")) {
      let heights = shanpshotKey(sch);
      // console.log(sch.map(l=>l.join("")).join("\n"))
      // console.log(heights)
      keys.push({
        type: "key",
        content: sch,
        heights: heights,
        heightsKeys: toKey(heights)
      });
    }
  }

  // console.log("locks:", locks.map(l => l.heightsKeys))
  // console.log("keys:", keys.map(k => k.heightsKeys))

  let fits = 0;

  for (let lock of locks) {
    for (let key of keys) {
      if (isOverlap(lock, key)) {
        fits++;
      }
    }
  }

  return fits;
};

const part2 = (data: string) => {
  let [init, ops] = data.split("\n\n");
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 25: x");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
