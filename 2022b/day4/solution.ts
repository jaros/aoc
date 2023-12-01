
import { Solution, readInput, title, withTime } from "../../common/types";

type Elf = { left: number, right: number };
type Pair = {
  elf1: Elf,
  elf2: Elf,
}

const getPairs = (data: string): Pair[] => data.split('\n').map(pairLine => {
  let [elf1, elf2] = pairLine.split(',').map(elf => {
    let [left, right] = elf.split('-').map(Number);
    return { left, right }
  });
  return { elf1, elf2 };
});

const hasFullOverlap = ({ elf1, elf2 }: Pair): boolean => {
  let firstOverlapsSecond = elf1.left <= elf2.left && elf1.right >= elf2.right;
  let secondOverlapsFrist = elf2.left <= elf1.left && elf2.right >= elf1.right;
  return firstOverlapsSecond || secondOverlapsFrist;
}

const isBetween = (n: number, left: number, right: number): boolean => n >= left && n <= right;
const hasBorderOverlap = ({ elf1, elf2 }: Pair): boolean => {
  let { right: r1, left: l1 } = elf1;
  let { right: r2, left: l2 } = elf2;
  return (isBetween(r1, l2, r2) && isBetween(l2, l1, r1)) || (isBetween(l1, l2, r2) && isBetween(r2, l1, r1));
}

const part1 = (data: string) => {
  return getPairs(data).filter(hasFullOverlap).length;
};

const part2 = (data: string) => {
  return getPairs(data).filter(p => hasBorderOverlap(p) || hasFullOverlap(p)).length;;
};

export const solve: Solution = (source) => {
  title("Camp Cleanup");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
