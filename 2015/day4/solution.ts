
import { Solution, readInput, title, withTime } from "../../common/types";

const {
  createHash
} = await import('node:crypto');

const findNumber = (prefix: string, leadingZerosInHash: string) => {
  let i = 0;
  let digest = "";
  while (!digest.startsWith(leadingZerosInHash)) {
    i++;
    const hash = createHash('md5');
    hash.update(prefix + i);
    digest = hash.digest('hex')
  }
  return i;
}

const part1 = (data: string) => {
  return findNumber(data, "00000");
};

// maybe it's not so efficient but on ARM machine (M2) in 2023 it takes only 4624 ms
const part2 = (data: string) => {
  return findNumber(data, "000000");
};

export const solve: Solution = (source) => {
  title("Day 4: The Ideal Stocking Stuffer");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
