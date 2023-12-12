
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
      // console.log('is over', records);
      return 1;
    } else {
      return 0;
    }
    // return (groupsSum == 0 ) ? 1 : 0;
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
    if (count > groups[0]) {
      return 0;
    }
    if (count == groups[0] && groups.length == 1 && idx == records.length - 1) {
      // console.log('last #', records)
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
  // console.log(data)
  // let rows = getRows(data);
  // let row = rows[rows.length - 1]; // rows.length - 1
  // console.log(row)
  // return getWays(row);
  let ways = getRows(data).map(getWays);
  // console.log(ways)
  return ways.reduce(sum);
}

// 8916 - answer is too high
// 8212 - answer is too high
const part2 = (data: string) => {
  return 0;
}


export const solve: Solution = (source) => {
  title("Day 12: Hot Springs");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
