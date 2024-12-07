import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

const sum = (a: number, b: number) => a + b;

type Equation = { testVal: number; nums: number[] };

type Operator = "+" | "*" | "||";

let toEquations = (lines: string[]): Equation[] => {
  return lines.map((line) => {
    let [test, ops] = line.split(": ");
    let testVal = Number(test);
    let nums = ops.split(" ").map(Number);
    return { testVal, nums };
  });
};

function canSolve(
  target: number,
  numbers: number[],
  operators: Operator[]
): boolean {
  // Evaluate the sequence of operations
  function evaluate(operands: number[], operations: Operator[]): number {
    let result = operands[0]; // one operand doesn't require operation, operations.length == operators.length - 1
    for (let i = 0; i < operations.length; i++) {
      if (operations[i] === "+") {
        result += operands[i + 1];
      } else if (operations[i] === "*") {
        result *= operands[i + 1];
      } else if (operations[i] === "||") {
        result = Number(String(result) + String(operands[i + 1]));
      }
    }
    return result;
  }

  // Backtracking to try all operator combinations
  function backtrack(index: number, operations: Operator[]): boolean {
    if (index === numbers.length - 1) {
      // Evaluate when all numbers are processed
      return evaluate(numbers, operations) === target;
    }

    for (const op of operators) {
      if (backtrack(index + 1, [...operations, op])) {
        return true;
      }
    }
    return false;
  }

  return backtrack(0, []);
}

const part1 = (data: string) => {
  const lines = parseInput(data);

  return toEquations(lines)
    .filter((eq) => {
      return canSolve(eq.testVal, eq.nums, ["+", "*"]);
    })
    .map((eq) => eq.testVal)
    .reduce(sum, 0);
};

const part2 = (data: string) => {
  const lines = parseInput(data);
  return toEquations(lines)
    .filter((eq) => {
      return canSolve(eq.testVal, eq.nums, ["+", "*", "||"]);
    })
    .map((eq) => eq.testVal)
    .reduce(sum, 0);
};

export const solve: Solution = (source) => {
  title("Day 7: Bridge Repair");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
