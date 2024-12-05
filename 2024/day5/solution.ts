import { Solution, readInput, title, withTime } from "../../common/types";

const sum = (a: number, b: number) => a + b;

const parseInput = (data: string) => {
  let lines = data.split("\n");
  let rules = [];
  let rulesDict: Record<number, number[]> = {};
  let updates = [];
  for (let l of lines) {
    if (l.includes("|")) {
      let rule = l.split("|").map(Number);
      rules.push(rule);
      let afterElmenents = rulesDict[rule[0]] || [];
      afterElmenents.push(rule[1]);
      rulesDict[rule[0]] = afterElmenents;
    } else if (l.includes(",")) {
      updates.push(l.split(",").map(Number));
    }
  }
  return { rules, rulesDict, updates };
};

const sumMids = (pages: number[][]) => {
  let mids = pages.map((update) => {
    let n = update.length;
    let m = Math.floor(n / 2);
    return update[m];
  });
  return mids.reduce(sum, 0);
};

const updatesOrdered = (rulesDict: Record<number, number[]>) => (update: number[]) => {
  let seen = new Set();
    for (let page of update) {
      let afterPages = rulesDict[page];
      let hasMetWrongPageBefore = afterPages?.some((p) => seen.has(p)) ?? false;
      if (hasMetWrongPageBefore) {
        return false;
      }
      seen.add(page);
    }
    return true;
}

type filterType = (page: number[]) => boolean; 

const not = (func: filterType) => (page: number[]) => !func(page);

const part1 = (data: string) => {
  const { rulesDict, updates } = parseInput(data);

  let rightUpdates = updates.filter(updatesOrdered(rulesDict));

  return sumMids(rightUpdates);
};


const part2 = (data: string) => {
  const { rulesDict, updates } = parseInput(data);

  let pickedUpdates = updates.filter(not(updatesOrdered(rulesDict)));

  for (let update of pickedUpdates) {
    let seen = new Set();
    let i = 0;
    while (i < update.length) {
      let page = update[i];
      let afterPages = rulesDict[page];
      let foundWrongPageBefore = afterPages?.find((p) => seen.has(p));
      if (foundWrongPageBefore !== undefined) {
        let beforeIdx = update.indexOf(foundWrongPageBefore);
        // swap
        update[beforeIdx] = page;
        update[i] = foundWrongPageBefore;
        // reset search to fix circular dependencies
        seen.clear();
        i = 0;
      } else {
        i++;
        seen.add(page);
      }
    }
  }
  return sumMids(pickedUpdates);
};

export const solve: Solution = (source) => {
  title("Day 5: Print Queue");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
