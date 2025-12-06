import { e, re } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Operation = "+" | "*";

type Problem  = {
  args: number[];
  operation: Operation;
}

type ProblemCol  = {
  args: Map<number, string>;
  operation: Operation;
}

const getProblems = (data: string): Problem[] => {
  const lines = data.split("\n");
  const height = lines.length;
  const result = new Map<number, Problem>();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // process line
    // split by any number of spaces
    const rows = line.trim().split(/\s+/);
    for (let j = 0; j < rows.length; j++) {
      let cell = rows[j];
      if (i === height - 1) {
        // process operation - last row - always defined
        const existing = result.get(j);
        if (!existing) {
          result.set(j, { args: [], operation: cell as Operation });
        } else {
          existing.operation = cell as Operation;
        }
      } else {
        const num = Number(cell);
        const existing = result.get(j);
        if (!existing) {
          result.set(j, { args: [num], operation: "" as Operation });
        } else {
          existing.args.push(num);
        }
      }
      // process cell
    }
  }
  return Array.from(result.values());
}

const getColumnProblems = (data: string): Problem[] => {
  const lines = data.split("\n");
  const height = lines.length;
  const result = new Map<number, ProblemCol>();
  // start with last row
  // save ops and record indices to use in map keys
  const opsRow = lines[height - 1];
  for (let j=0; j < opsRow.length; j++) {
    const cell = opsRow[j];
    if (cell !== " ") {
      result.set(j, {args: new Map<number, string>(), operation: cell as Operation});
    }
  }
  
  for (let i = 0; i < lines.length-1; i++) {
    const line = lines[i];
    let lastProblemIndex = 0; // the new columns are not aligned by leftmost char
    for (let j=0; j < line.length; j++) {
      if (result.has(j)) {
        lastProblemIndex = j;
      }
      let cell = line[j];
      if (cell !== " ") {
        let problem = result.get(lastProblemIndex)!;
        problem.args.set(j, (problem.args.get(j) ?? "") + cell);
      }
    }
  }
  const res: Problem[] = [];
  for (const probCol of result.values()) {
    const argsNums: number[] = [];
    for (const argStr of probCol.args.values()) {
      argsNums.push(Number(argStr));
    }
    res.push({args: argsNums, operation: probCol.operation});
  }
  return res;
}

const calculate = (problem: Problem): number => {
  switch (problem.operation) {
    case "+":
      return problem.args.reduce((a, b) => a + b, 0);
    case "*":
      return problem.args.reduce((a, b) => a * b, 1);
    default: {
      const _exhaustive: never = problem.operation;
      return _exhaustive;
    }
  }
};

const countMathProblems = (problems: Problem[]): number =>
  problems.reduce((sum, problem) => sum + calculate(problem), 0);

const part1 = (data: string) => {
  return countMathProblems(getProblems(data));
};

const part2 = (data: string) => {
  return countMathProblems(getColumnProblems(data));
};

export const solve: Solution = (source) => {
  title("Day 6: Trash Compactor");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
