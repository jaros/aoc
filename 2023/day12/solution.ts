
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Row = {
  records: string[];
  groups: number[];
}

const getRows = (data: string) : Row[] => {
  return data.split('\n').map(r => {
    let [row, groups] = r.split(' ')
    return {
      records: row.split(''),
      groups: groups.split(',').map(Number)
    }
  });
}

const getWaysAt = (records: string[], groups: number[], inCurrGroupCount: number, idx: number): number => {
  let groupsSum = groups.reduce(sum, 0);
  let isOver = idx == records.length;
  // console.log('groupsSum', groupsSum, 'isOver', isOver, 'inCurrGroupCount', inCurrGroupCount)
  if (isOver) {
    if (groupsSum == 0) {
      // console.log('%', records);
      return 1;
    } else {
      return 0;
    }
  }
  
  let curr = records[idx];
  let prev = idx > 0 ? records[idx-1] : null;
  if (curr == '.') { // either stopping the group or just continous empty place
    if (inCurrGroupCount > 0) {
      if (inCurrGroupCount < groups[0]) {
        return 0;
      } else { // inCurrGroupCount == groups[0]
        return getWaysAt(records, groups.slice(1), 0, idx + 1); // removes intermediary counted group
      }
    }
    return getWaysAt(records, groups, 0, idx + 1);
  }

  if (curr == '#') { // either starting the group or just continous counting elements in group
    let count = inCurrGroupCount + 1;
    if (groups.length == 0) { // no more groups
      return 0;
    }
    if (count > groups[0]) {
      return 0;
    }
    if (count == groups[0] && groups.length == 1 && idx == records.length - 1) {
      // console.log('#', records)
      return 1;
    }
    if (count == 1 && prev == '#') {
      return 0;
    }
    return getWaysAt(records, groups, count, idx+1);
  }

  if (curr != '?') {
    throw new Error('current symbol is not "?"')
  }

  // else ?
  let recEmpty = [...records];
  let recSpring = [...records];
  recEmpty[idx] = '.';
  recSpring[idx] = '#';
  return getWaysAt(recEmpty, groups, inCurrGroupCount, idx) + (groupsSum == 0 ? 0 : getWaysAt(recSpring, groups, inCurrGroupCount, idx));
}

const getWays = (row: Row): number => {
  return getWaysAt(row.records, row.groups, 0, 0);
}

const part1 = (data: string) => {
  let ways = getRows(data).map(getWays);
  // console.log(ways)
  return ways.reduce(sum);
}

// 8916 - answer is too high
// 8212 - answer is too high
// 7716 - ok
const part2 = (data: string) => {
  let rows = getRows(data);
  let rr: Row[] = rows.map(r => {
    let records: string[] = [];
    let groups: number[] = [];
    for (let i = 0; i < 5; i++) {
      records.push(...r.records);
      if (i < 4) {
        records.push('?');
      }
      groups.push(...r.groups);
    }
    return {
      records,
      groups
    };
  });
  // let first = rr[0];
  // console.log(first.records.join(''))
  // console.log(first.groups.join(','))
  // let w= getWays(first);
  // console.log(w)
  // return w;

  // let ways = rr.map(getWays);
  let s = 0;
  for (let i = 9; i < 10; i++) {
    console.log(rr[i].records.join(""));
    console.log(rr[i].groups.join(","));
    let w = getWays(rr[i]);
    s += w;
    console.log(i, w, s);
  }
  return s;
}


export const solve: Solution = (source) => {
  title("Day 12: Hot Springs");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
