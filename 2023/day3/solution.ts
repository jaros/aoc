
import { Solution, readInput, title, withTime } from "../../common/types";

let isNum = (c: string) => c >= '0' && c <= '9';

let isSymbol = (c: string | undefined) => c && !isNum(c) && c != ".";

let isGear = (c: string) => c == '*';

type GearNum = {num: number, from: number, to: number};

const fetchNum = (row: string, col: number): GearNum => {
  let numS = '' + row[col];
  let k = col + 1;
  while (isNum(row[k])) {
    numS = numS + row[k++];
  }
  let to = k-1;

  k = col - 1;
  while (isNum(row[k])) {
    numS = row[k--] + numS;
  }
  let from = k+1;
  return {num: Number(numS), from, to};
}

const part1 = (data: string) => {
  let rows = data.split("\n");

  let hasAdjSymbol = (i: number, from: number, to: number): boolean => {
    if (isSymbol(rows[i][from - 1]) || isSymbol(rows[i][to + 1])) { // same row borders
      return true;
    }
    for (let k = from - 1; k <= to + 1; k++) {
      if (isSymbol(rows[i - 1]?.[k]) || isSymbol(rows[i + 1]?.[k])) { // above/under row borders
        return true;
      }
    }
    return false;
  }

  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (isNum(rows[i][j])) {
        let { num, to } = fetchNum(rows[i], j)
        if (hasAdjSymbol(i, j, to)) {
          total += num;
        }
        j = to;
      }
    }
  }
  return total;
}
//531561

const part2 = (data: string) => {
  let rows = data.split("\n");

  let findSurroundNums = (i: number, j: number): number[] => {
    let nums = new Set<GearNum & {row: number}>();
    for (let r=i-1; r <= i+1; r++) {
      for (let c=j-1; c <= j+1; c++) {
        let adj = rows[r]?.[c];
        if (isNum(adj)) {
          let gearNum = fetchNum(rows[r], c);
          nums.add({...gearNum, row: r});
          c = gearNum.to;
        }
      }
    }
    return [...nums].map(n => n.num);
  }

  let total = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (isGear(rows[i][j])) {

        let nums = findSurroundNums(i, j);

        if (nums.length == 2) {
          total += (nums[0] * nums[1]);
        }
      }
    }
  }
  return total;
}
// 83279367

export const solve: Solution = (source) => {
  title("Day 3: Gear Ratios");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
