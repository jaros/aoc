import { e, re } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Problem  = {
  args: number[];
  operation: string;
}

type ProblemCol  = {
  args: Map<number, string>;
  operation: string;
}

const getProblems = (data: string): Problem[] => {
  let lines = data.split("\n");
  let height = lines.length;
  let result = new Map<number, Problem>();
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // process line
    // split by any number of spaces
    let rows = line.trim().split(/\s+/);
    for (let j = 0; j < rows.length; j++) {
      let cell = rows[j];
      if (i === height - 1) {
        // process operation - last row - always defined
        result.get(j)!.operation = cell;
      } else {
        let num = Number(cell); 
        let problem = result.get(j);
        if (problem) {
          problem.args.push(num);
        } else {
          problem = {args: [num], operation: ""}
        }
        result.set(j, problem);
      }
      // process cell
    }
  }
  return Array.from(result.values());
}

const getColumnProblems = (data: string): Problem[] => {
  let lines = data.split("\n");
  let height = lines.length;
  let result = new Map<number, ProblemCol>();
  // start with last row
  // save ops and record indices to use in map keys
  let opsRow = lines[height - 1];
  for (let j=0; j < opsRow.length; j++) {
    let cell = opsRow[j];
    if (cell !== " ") {
      result.set(j, {args: new Map<number, string>(), operation: cell});
    }
  }
  
  for (let i = 0; i < lines.length-1; i++) {
    let line = lines[i];
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
  let res: Problem[] = [];
  for (const probCol of result.values()) {
    let argsNums: number[] = [];
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
  }
  return 0;
};

const countMathProblems = (problems: Problem[]): number => {
  let total = 0;
  for (const problem of problems) {
    total += calculate(problem);
  }
  return total;
}

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
