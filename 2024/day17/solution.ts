import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type OpResult = { pointer: number | null; out: number | null };

type Op = (val: number) => OpResult;

const part1 = (data: string) => {
  const [regs, prog] = data.split("\n\n");
  const registers: Record<string, number> = Object.fromEntries(
    regs.split("\n").map((line) => {
      let [type, codeS] = line.split("Register ")[1].split(": ");
      return [type, Number(codeS)];
    })
  );

  const program: number[] = prog.split("Program: ")[1].split(",").map(Number);

  // console.log(registers)
  // console.log(program)

  const operands: Record<number, () => number> = {
    0: () => 0,
    1: () => 1,
    2: () => 2,
    3: () => 3,
    4: () => registers.A,
    5: () => registers.B,
    6: () => registers.C,
  };

  // ops return the pointer increase
  const opcodes: Record<number, Op> = {
    // adv
    0: (val) => {
      const res = Math.trunc(registers.A / Math.pow(2, operands[val]()));
      // console.log("adv", res)
      registers["A"] = res;
      return { pointer: null, out: null };
    },
    // bxl
    1: (val) => {
      const res = registers.B ^ val;
      registers.B = res;
      return { pointer: null, out: null };
    },
    // bst
    2: (val) => {
      const res = operands[val]() % 8;
      registers.B = res;
      return { pointer: null, out: null };
    },
    // jnz
    3: (val) => {
      if (registers.A == 0) {
        return { pointer: null, out: null };
      }
      return { pointer: val, out: null };
    },
    // bxc
    4: (_val) => {
      const res = registers.B ^ registers.C;
      registers.B = res;
      return { pointer: null, out: null };
    },
    // out
    5: (val) => {
      let res = operands[val]() % 8;
      // console.log("out", res, "val", val, "combo", operands[val]())
      return { pointer: null, out: res };
    },
    // bdv
    6: (val) => {
      const res = Math.trunc(registers.A / Math.pow(2, operands[val]()));
      registers.B = res;
      return { pointer: null, out: null };
    },
    // cdv
    7: (val) => {
      const res = Math.trunc(registers.A / Math.pow(2, operands[val]()));
      registers.C = res;
      return { pointer: null, out: null };
    },
  };

  let instructionPointer = 0;
  let outs: number[] = [];
  while (instructionPointer < program.length - 1) {
    let operation = opcodes[program[instructionPointer]];
    let operand = program[instructionPointer + 1];
    let { pointer, out } = operation(operand);
    if (pointer != null) {
      instructionPointer = pointer;
    } else {
      instructionPointer += 2;
    }
    if (out != null) {
      outs.push(out)
    }
  }
  console.log(outs.join(","));
  return outs.join("");
};

const part2 = (data: string) => {
  let ans = 0;
  return ans;
};

export const solve: Solution = (source) => {
  title("Day 17: Chronospatial Computer");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
