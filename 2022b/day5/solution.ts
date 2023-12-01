
import { Solution, readInput, title, withTime } from "../../common/types";

type Config = {
  stacks: Array<Array<string>>,
  moves: Array<Array<number>>
}

const init = (data: string): Config => {
  let rows = data.split('\n');
  let stackBaseIdx = 0;
  while (rows[stackBaseIdx].charAt(1) != '1') { // to start building initial stacks
    stackBaseIdx++;
  }

  const stacks: Array<Array<string>> = [[]];

  for (let i = stackBaseIdx - 1; i >= 0; i--) {
    for (let col = 1, stackNr = 1; col < rows[i].length; col += 4, stackNr++) {
      let crate = rows[i][col];
      if (crate != ' ') {
        let stack = stacks[stackNr] ?? [];
        stack.push(crate);
        stacks[stackNr] = stack;
      }
    }
  }

  const moves: Array<Array<number>> = [];

  for (let i = stackBaseIdx + 2; i < rows.length; i++) {
    let chuncks = rows[i].split(' ');
    moves.push([chuncks[1], chuncks[3], chuncks[5]].map(Number));
  }

  return { stacks, moves };
}


const readTopMessage = (stacks: Array<Array<string>>) => stacks.reduce((acc, curr) => curr.length ? acc + curr[curr.length - 1] : acc, '');

const part1 = (data: string) => {
  const { stacks, moves } = init(data);

  for (let [times, from, to] of moves) {
    while (times-- > 0) {
      stacks[to].push(stacks[from].pop()!);
    }
  }
  return readTopMessage(stacks);
};

const part2 = (data: string) => {
  const { stacks, moves } = init(data);

  for (let [times, from, to] of moves) {
    let cutIdx = stacks[from].length - times;
    let moving = stacks[from].splice(cutIdx, times);
    stacks[to].push(...moving);
  }
  return readTopMessage(stacks);
};

export const solve: Solution = (source) => {
  title("Supply Stacks");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
