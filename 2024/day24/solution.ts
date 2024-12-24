import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Wire = {
  key: string;
  value: number;
};

type Expression = {
  op: string;
  x: string;
  y: string;
};

const opMap: Record<string, (op1: number, op2: number) => number> = {
  AND: (op1: number, op2: number) => op1 && op2,
  OR: (op1: number, op2: number) => op1 || op2,
  XOR: (op1: number, op2: number) => op1 ^ op2,
};

const part1 = (data: string) => {
  let [init, ops] = data.split("\n\n");
  let initWires: Wire[] = init
    .split("\n")
    .map((line) => line.split(": "))
    .map(([key, value]) => ({ key, value: Number(value) }));
  let computed = new Map<string, number>();
  for (let wire of initWires) {
    computed.set(wire.key, wire.value);
  }

  let expressions = new Map<string, Expression>();
  for (let op of ops.split("\n")) {
    let [exp, key] = op.split(" -> ");
    let [op1, oper, op2] = exp.split(" ");
    expressions.set(key, { op: oper, x: op1, y: op2 });
  }

  let getResult = (key: string, expr: Expression): number => {
    if (computed.has(key)) {
      return computed.get(key)!;
    }
    let op1Val = getResult(expr.x, expressions.get(expr.x)!);
    let op2Val = getResult(expr.y, expressions.get(expr.y)!);
    let res = opMap[expr.op]?.(op1Val, op2Val);
    computed.set(key, res);
    return res;
  };

  for (let [key, expr] of expressions.entries()) {
    computed.set(key, getResult(key, expr));
  }
  let res = [];
  for (let [key, val] of computed.entries()) {
    if (key.startsWith("z")) {
      res.push([Number(key.split("z")[1]), val]);
    }
  }
  res.sort((a, b) => b[0] - a[0]);

  return parseInt(res.map((r) => r[1]).join(""), 2);
};

const part2 = (data: string) => {
  let [init, ops] = data.split("\n\n");
  let initWires: Wire[] = init
    .split("\n")
    .map((line) => line.split(": "))
    .map(([key, value]) => ({ key, value: Number(value) }));
  let computed = new Map<string, number>();
  for (let wire of initWires) {
    computed.set(wire.key, wire.value);
  }

  let formulas = new Map<string, Expression>();
  for (let op of ops.split("\n")) {
    let [exp, key] = op.split(" -> ");
    let [op1, oper, op2] = exp.split(" ");
    formulas.set(key, { op: oper, x: op1, y: op2 });
  }

  let makeWire = (char: string, num: number) => char + (num < 10 ? "0" : "") + num;

  let sameTuple = ([x1, y1]: [string, string], [x2, y2]: [string, string]) => x1 == x2 && y1 == y2 || x1 == y2 && y1 == x2;

  let verifyZ = (wire: string, num: number): boolean => {
    if (!formulas.has(wire)) {
      return false;
    }
    let {op, x, y} = formulas.get(wire)!;
    if (op != "XOR") {
      return false;
    }
    if (num == 0) {
      return sameTuple([x, y], ["x00", "y00"]);
    }
    return verifyIntermediateXor(x, num) && verifyCarryBit(y, num) || verifyIntermediateXor(y, num) && verifyCarryBit(x, num);
  }

  let verifyIntermediateXor = (wire: string, num: number): boolean => {
    if (!formulas.has(wire)) {
      return false;
    }
    let {op, x, y} = formulas.get(wire)!;
    if (op != "XOR") {
      return false;
    }
    return sameTuple([x, y], [makeWire("x", num), makeWire("y", num)])
  }

  let verifyCarryBit = (wire: string, num: number): boolean => {
    if (!formulas.has(wire)) {
      return false;
    }
    let {op, x, y} = formulas.get(wire)!;
    if (num == 1) {
      if (op != "AND") {
        return false;
      }
      return sameTuple([x, y], ["x00", "y00"]);
    }
    if (op != "OR") {
      return false;
    }
    return verifyDirectCarry(x, num-1) && verifyRecarry(y, num-1) || verifyDirectCarry(y, num-1) && verifyRecarry(x, num-1);
  }

  let verifyDirectCarry = (wire: string, num: number): boolean => {
    if (!formulas.has(wire)) {
      return false;
    }
    let {op, x, y} = formulas.get(wire)!;
    if (op != "AND") {
      return false;
    }
    return sameTuple([x, y], [makeWire("x", num), makeWire("y", num)])
  }

  let verifyRecarry = (wire: string, num: number): boolean => {
    if (!formulas.has(wire)) {
      return false;
    }
    let {op, x, y} = formulas.get(wire)!;
    if (op != "AND") {
      return false;
    }
    return verifyIntermediateXor(x, num) && verifyCarryBit(y, num) || verifyIntermediateXor(y, num) && verifyCarryBit(x, num);
  }

  let verify = (num: number): boolean => verifyZ(makeWire("z", num), num)

  let progress = (): number => {
    let i = 0;
    while (true) {
      if (!verify(i)) {
        break;
      }
      i++;
    }
    return i;
  }

  let attemptSwap = (base: number): [string, string] | undefined => {
    for (let x of formulas.keys()) {
      for (let y of formulas.keys()) {
        let tmp = formulas.get(x)!;
        formulas.set(x, formulas.get(y)!)
        formulas.set(y, tmp);
        let current = progress();
        if (current > base) {
          return [x, y];
        }
        tmp = formulas.get(x)!;
        formulas.set(x, formulas.get(y)!)
        formulas.set(y, tmp);
      }
    }
  }

  let swaps = [];

  for (let i=0; i < 4; i++) {
    let base = progress();
    let pair = attemptSwap(base);
    if (pair) {
      swaps.push(...pair);
    } else {
      console.log("cannot find next swap for base", base)
    }
  }

  return swaps.sort().join(',')
};

export const solve: Solution = (source) => {
  title("Day 24: Crossed Wires");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
