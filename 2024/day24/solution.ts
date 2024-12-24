import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Wire = {
  key: string;
  value: number;
};

type Expression = {
  // key: string;
  operation: string;
  operand1: string;
  operand2: string;
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
    expressions.set(key, { operation: oper, operand1: op1, operand2: op2 });
  }

  let getResult = (key: string, expr: Expression): number => {
    if (computed.has(key)) {
      return computed.get(key)!;
    }
    let op1Val = getResult(expr.operand1, expressions.get(expr.operand1)!)
    let op2Val = getResult(expr.operand2, expressions.get(expr.operand2)!)
    let res = opMap[expr.operation]?.(op1Val, op2Val)
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
  res.sort((a, b) => b[0]- a[0]);

  return parseInt(res.map(r => r[1]).join(""), 2);
};

const part2 = (data: string) => {
  let list = data.split("\n").map((l) => l.split("-"));
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 24: Crossed Wires");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
