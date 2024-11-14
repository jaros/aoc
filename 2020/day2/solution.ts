
import { Solution, readInput, title, withTime } from "../../common/types";


type Policy = {
  min: number,
  max: number,
  pattern: string,
}

type Password = {
  policy: Policy,
  value: string,
}

const parseInput = (data: string): Password[] => data.split("\n").map(line => {
  let [policy, pwd] = line.split(": ");
  let [range, pattern] = policy.split(" ");
  let [min, max] = range.split("-").map(Number);
  return {
    value: pwd,
    policy: {min, max, pattern}
  }
});

const isValidRange = (pwd: Password): boolean => {
  let times = 0;
  let position = 0;
  let lastPosition = 0;
  while (lastPosition != -1) {
    lastPosition = pwd.value.indexOf(pwd.policy.pattern, position);
    if (lastPosition != -1) {
      times++;
      position = lastPosition + 1;
    }
  }
  return times >= pwd.policy.min && times <= pwd.policy.max;
}

const isValidEitherPosition = (pwd: Password): boolean => {
  let hasFirst = pwd.value[pwd.policy.min-1] == pwd.policy.pattern ? 1 : 0;
  let hasSecond = pwd.value[pwd.policy.max-1] == pwd.policy.pattern ? 1 : 0;
  return !!(hasFirst ^ hasSecond);
}


const part1 = (data: string) => {
  let passwords = parseInput(data);
  return passwords.filter(isValidRange).length;
};

const part2 = (data: string) => {
  let passwords = parseInput(data);
  return passwords.filter(isValidEitherPosition).length;
};

export const solve: Solution = (source) => {
  title("Day 2: Password Philosophy");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
