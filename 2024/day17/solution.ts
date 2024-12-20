import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type OpResult = { pointer: number | null; out: number | null };

type Op = (val: number) => OpResult;

const buildUnit = (data: string): {process: (pointer: number) => OpResult, program: number[]} => {
  const [regs, prog] = data.split("\n\n");
  const registers: Record<string, number> = Object.fromEntries(
    regs.split("\n").map((line) => {
      let [type, codeS] = line.split("Register ")[1].split(": ");
      return [type, Number(codeS)];
    })
  );

  const program: number[] = prog.split("Program: ")[1].split(",").map(Number);
  const operands: Record<number, () => number> = {
    0: () => 0,
    1: () => 1,
    2: () => 2,
    3: () => 3,
    4: () => registers.A,
    5: () => registers.B,
    6: () => registers.C,
  };

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
  const process = (pointer: number): OpResult => {
    let operation = opcodes[program[pointer]];
    let operand = program[pointer + 1];
    return operation(operand);
  };
  return {process, program}
}

const part1 = (data: string) => {
  const unit = buildUnit(data);

  let instructionPointer = 0;
  let outs: number[] = [];
  while (instructionPointer < unit.program.length - 1) {
    let { pointer, out } = unit.process(instructionPointer);
    if (pointer != null) {
      instructionPointer = pointer;
    } else {
      instructionPointer += 2;
    }
    if (out != null) {
      outs.push(out)
    }
  }
  return outs.join(",");
};

const part2 = (data: string) => {
  const [_regs, prog] = data.split("\n\n");
  const program: number[] = prog.split("Program: ")[1].split(",").map(Number);
  // console.log(program)

  let find = (target: number[], ans: number): number | undefined => {
    if (target.length == 0) {
      return ans;
    }
    for (let t=0; t < 8; t++) {
      let a = ans << 3 | t
      let b = 0
      let c = 0
      let out = null
      let adv3 = false
      let combo = (operand: number): number => {
        if (operand >= 0 && operand <= 3) {
          return operand;
        }
        if (operand == 4) return a
        if (operand == 5) return b
        if (operand == 6) return c
        throw new Error("bad operand " + operand)
      }
      
      for (let pointer=0; pointer < program.length - 2; pointer += 2) {
        let ins = program[pointer]
        let operand = program[pointer + 1]
        if (ins == 0) {
          if (adv3) {
            throw new Error("multiple ADVs")
          }
          if (operand != 3) {
            throw new Error("bad zero instr")
          }
          adv3 = true
        } else if (ins == 1) {
          b = b ^ operand
        } else if (ins == 2) {
          b = combo(operand) % 8
        } else if (ins == 3) {
          throw new Error("JNZ in loop body")
        } else if (ins == 4) {
          b = b ^ c
        } else if (ins == 5) {
          if (out != null) {
            throw new Error("multiple outs")
          }
          out = combo(operand) % 8
        } else if (ins == 6) {
          b = a >> combo(operand)
        } else if (ins == 7) {
          c = a >> combo(operand)
        }

        if (out == target[target.length-1]) {
          let sub = find(target.slice(0, -1), a)
          if (sub == undefined) {
            continue
          } else {
            return sub
          }
        }
      }
    }
  }

  return find(program, 0);
};

export const solve: Solution = (source) => {
  title("Day 17: Chronospatial Computer");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
