
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Monkey = {
  id: number;
  items: number[];
  op: (prev: number) => number;
  divisible_by: number;
  truthy_monkey: number;
  falsy_monkey: number;
  times: number;
}

const monkeys: Monkey[] = [];

let ops: Record<string, (a: number) => (b: number) => number> = {
  '+': (n: number) => (old: number) => old + n,
  '-': (n: number) => (old: number) => old - n,
  '*': (n: number) => (old: number) => old * n,
  '/': (n: number) => (old: number) => old / n,
  'sq': (n: number) => (old: number) => old * old,
};

let initMonkeys = (data: string): Monkey[] => {
  const monkeys: Monkey[] = [];
  for (let block of data.split('\n\n')) {
    let [idx, sItems, sOp, testDiv, trusty, falsy] = block.split('\n');
    let items = sItems.split(': ')[1].split(', ').map(Number);
    let divisible_by = Number(testDiv.split('by ')[1]);
    let trusty_monkey = Number(trusty.split('to monkey ')[1])
    let falsy_monkey = Number(falsy.split('to monkey ')[1])
    let [o1, o, o2] = sOp.split('= ')[1].split(' ');

    let operation = o1 == o2 ? 'sq' : o;
    let op = ops[operation](Number(o2));

    monkeys.push({
      id: Number(idx.slice(0, idx.length - 1).split(' ')[1]),
      items,
      divisible_by,
      truthy_monkey: trusty_monkey,
      falsy_monkey,
      op,
      times: 0
    })
  }
  return monkeys;
}

const part1 = (data: string) => {
  let monkeys = initMonkeys(data);

  let simulateRound = () => {
    for (let monkey of monkeys) {
      while (monkey.items.length) {
        monkey.times++;
        let item = monkey.items.shift()!;
        item = monkey.op(item);
        item = Math.floor(item / 3);
        let test = item / monkey.divisible_by;
        if (test - Math.floor(test) == 0) {
          monkeys[monkey.truthy_monkey].items.push(item);
        } else {
          monkeys[monkey.falsy_monkey].items.push(item);
        }
      }
    }
  }

  for (let i = 0; i < 20; i++) {
    simulateRound();
  }

  let [m1, m2] = monkeys.sort((a, b) => b.times - a.times);

  return m1.times * m2.times;
}


const part2 = (data: string) => {
  let monkeys = initMonkeys(data);
  let commonDivider = monkeys.reduce((cd, m) => cd * m.divisible_by, 1)

  let simulateRound = () => {
    for (let monkey of monkeys) {
      while (monkey.items.length) {
        monkey.times++;
        let item = monkey.items.shift()!;
        item = monkey.op(item);
        item = item % commonDivider;
        let test = item / monkey.divisible_by;
        if (test - Math.floor(test) == 0) {
          monkeys[monkey.truthy_monkey].items.push(item);
        } else {
          monkeys[monkey.falsy_monkey].items.push(item);
        }
      }
    }
  }

  for (let i = 0; i < 10000; i++) {
    simulateRound();
  }

  let [m1, m2] = monkeys.sort((a, b) => b.times - a.times);

  return m1.times * m2.times;
}

export const solve: Solution = (source) => {
  title("Day 11: Monkey in the Middle");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
