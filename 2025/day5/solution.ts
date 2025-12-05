import { e, re } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Range = {from: number, to: number};

const getIngredients = (data: string): {ranges: Range[], availableIDs: number[]} => {
  // data.split("\n").map((line) => line.split(""));
  const [freshIngrIdRanges, availableIDsStr] = data.split("\n\n");
  const ranges: Range[] = freshIngrIdRanges.split("\n").map((line) => {
    const [from, to] = line.split("-").map((x) => parseInt(x, 10));
    return {from, to};
  });
  const availableIDs = availableIDsStr.split("\n").map((x) => parseInt(x, 10));
  return {ranges, availableIDs};
}
  


const part1 = (data: string) => {
  const {ranges, availableIDs} = getIngredients(data);
  let freshIngredients = new Set<number>();
  for (const id of availableIDs) {
    for (const range of ranges) {
      if (id >= range.from && id <= range.to) {
        freshIngredients.add(id);
        break;
      }
    }
  }
  // console.log(grid);
  return freshIngredients.size;
};

const part2 = (data: string) => {
  const {ranges} = getIngredients(data);

  // aka reduce
  const mergeRanges = (ranges: Range[]): Range[] => {
    if (ranges.length === 0) return [];

    // Sort ranges by start (and then by end)
    const sorted = [...ranges].sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });

    const merged: Range[] = [];
    let current = { ...sorted[0] };

    for (let i = 1; i < sorted.length; i++) {
      const r = sorted[i];

      // merge only overlapping (not just touching) ranges
      if (current.to >= r.from) {
        current.to = Math.max(current.to, r.to);
      } else {
        merged.push(current);
        current = { ...r }; // copy to avoid mutation by reference in merged result
      }
    }

    merged.push(current);
    return merged;
  };

  const finalRanges = mergeRanges(ranges);

  let count = 0;
  for (const range of finalRanges) {
    count += range.to - range.from + 1;
  }

  return count;
};

export const solve: Solution = (source) => {
  title("Day 5: Cafeteria");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
