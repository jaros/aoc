
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const ops: Record<string, (a: number, b: number) => boolean> = {
  '>': (a: number, b: number) => a > b,
  '<': (a: number, b: number) => a < b,
  '>=': (a: number, b: number) => a >= b,
  '<=': (a: number, b: number) => a <= b,
  '==': (a: number, b: number) => a == b,
  '!=': (a: number, b: number) => a != b,
};

const part1 = (data: string) => {
  let map: Record<string, number> = {};
  for (let line of data.split("\n")) {
    let [act, cond] = line.split(" if ");
    let [reg, op, sVal] = act.split(" ");
    let val = Number(sVal) * (op == "inc" ? 1 : -1);

    let [condReg, condOp, sCondVal] = cond.split(" ");
    if (ops[condOp](map[condReg] ?? 0, Number(sCondVal))) {
      map[reg] = (map[reg] ?? 0) + val;
    }
  }

  return Math.max(...Object.values(map));
}


const part2 = (data: string) => {
  let map: Record<string, number> = {};
  let max = 0;
  for (let line of data.split("\n")) {
    let [act, cond] = line.split(" if ");
    let [reg, op, sVal] = act.split(" ");
    let val = Number(sVal) * (op == "inc" ? 1 : -1);
    let currVal = map[reg] || 0;

    let [condReg, condOp, sCondVal] = cond.split(" ");
    if (ops[condOp](map[condReg] || 0, Number(sCondVal))) {
      map[reg] = currVal + val;
      max = Math.max(max, map[reg]);
    }
  }

  return max;
}

export const solve: Solution = (source) => {
  title("Day 8: I Heard You Like Registers");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
