
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Row = {
  records: string;
  groups: number[];
}

const getRows = (data: string) : Row[] => {
  return data.split('\n').map(r => {
    let [row, groups] = r.split(' ')
    return {
      records: row,
      groups: groups.split(',').map(Number)
    }
  });
}

const calculateWays = (withCache: boolean, row: Row) => {
  const cache = new Map();
  const getWaysAt = (records: string, groups: number[], idx: number, countsIdx: number, currentLength: number): number => {
    const key = `${idx}:${countsIdx}:${currentLength}`;
    if (withCache && cache.has(key)) {
      return cache.get(key);
    }
  
    if (idx == records.length) {
      if(countsIdx === groups.length && currentLength === 0) {
        return 1;
      } else if(countsIdx === (groups.length - 1) && groups[countsIdx] === currentLength) {
        return 1;
      } else {
        return 0;
      }
    }
    
    let curr = records[idx];
    let total = 0;
  
    for (let ch of ['.', '#']) {
      if(curr === ch || curr === '?') {
        if(currentLength === 0 && ch === '.') {
            total += getWaysAt(records, groups, idx + 1, countsIdx, 0);
        }
        else if(currentLength > 0 && ch === '.' && groups[countsIdx] === currentLength && countsIdx < groups.length) {
            total += getWaysAt(records, groups, idx + 1, countsIdx + 1, 0);
        }
        else if(ch === '#') {
            total += getWaysAt(records, groups, idx + 1, countsIdx, currentLength + 1)
        }
      }
    }
    if (withCache) {
      cache.set(key, total);
    }
    return total;
  }
  return getWaysAt(row.records, row.groups, 0, 0, 0);
};

const part1 = (data: string) => {
  let ways = getRows(data).map(row => calculateWays(false, row));
  return ways.reduce(sum);
}

// 7716 - ok
const part2 = (data: string) => {
  let rows: Row[] = getRows(data).map(r => {
    const records = Array(5).fill(0).map(_ => r.records).join('?');
    const groups = Array(5).fill(0).flatMap(_ => r.groups);
    return {records, groups};
  });
  let ways = rows.map(row => calculateWays(true, row));
  return ways.reduce(sum);
}


export const solve: Solution = (source) => {
  title("Day 12: Hot Springs");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
