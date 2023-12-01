
import { Solution, readInput, title, withTime } from "../../common/types";


let a = 'a'.charCodeAt(0);
let z = 'z'.charCodeAt(0);
let A = 'A'.charCodeAt(0);

let getWeight = (item: string): number => {
  let c = item.charCodeAt(0);
  return c >= a && c <= z ? c - a + 1 : c - A + 27;
};

const part1 = (data: string) => {
  let findCommonItem = (items: string): string => {
    let left: Record<string, number> = {};
    let right: Record<string, number> = {};
    let len = items.length;
    for (let i=0; i < len/2; i++) {
      let l = items.charAt(i);
      let r = items.charAt(len - i - 1);
      left[l] = 1;
      right[r] = 1;
      if (right[l]) {
        return l;
      } else if (left[r]) {
        return r;
      }
    }
    throw new Error(`common item does not exist: ${items}`);
  };


  let rucksacks = data.split('\n');
  let sum = 0;
  for (let rucksack of rucksacks) {
    sum += getWeight(findCommonItem(rucksack));
  }
  return sum;
};



const part2 = (data: string) => {
  let findGroupBadge = (...els: string[]): string => {
    let [s1, ...sets] = els.map( e => new Set(e.split('')));
    return [...s1].find(item => sets.every(s => s.has(item)))!;
  }

  let rucksacks = data.split('\n');
  let sum = 0;
  for (let i=2; i < rucksacks.length; i += 3) {
    sum += getWeight(findGroupBadge(rucksacks[i], rucksacks[i-1], rucksacks[i-2]));
  }
  return sum;
};

export const solve: Solution = (source) => {
  title("Rucksack Reorganization");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
