
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Row = {
  records: string;
  groups: number[];
}

const parseData = (data: string): string[] => {
  return data.split('\n\n');
}

let findVerticalMiddle = (cluster: string) => {
  let rows = cluster.split('\n');
  let columns = [];
  for (let j = 0; j < rows[0].length; j++) {
    columns.push(rows.map(r => r[j]).join(''));
  }
  let len = columns.length;

  let l = 0;
  while (l < len-1) {
    let k = 0;
    let noMirror = false;
    while (l-k >= 0 && l+k+1 < len) {
      let left = columns[l-k];
      let right = columns[l+k+1];
      // console.log(left);
      // console.log(right);
      for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) {
          noMirror = true;
          break;
        }
      }
      if (noMirror) {
        // console.log(l, k);
        break;
      }
      k++;
    }
    if (!noMirror) {
      return l + 1;
    }
    l++;
  }
  // throw new Error('No vertical mirror found');
  return -1;
}

let findHorizontalMiddle = (cluster: string) => {
  let rows = cluster.split('\n');
  
  let len = rows.length;

  let t = 0;
  while (t < len-1) {
    let k = 0;
    let noMirror = false;
    while (t-k >= 0 && t+k+1 < len) {
      let top = rows[t-k];
      let bottom = rows[t+k+1];
      // console.log(top);
      // console.log(bottom);
      for (let i = 0; i < top.length; i++) {
        if (top[i] !== bottom[i]) {
          noMirror = true;
          break;
        }
      }
      if (noMirror) {
        // console.log(t, k);
        break;
      }
      k++;
    }
    if (!noMirror) {
      return t + 1;
    }
    t++;
  }
  // throw new Error('No horizontal mirror found');
  return -1;
}

const part1 = (data: string) => {
  let clusters = parseData(data);

  let total = 0;
  for (let cluster of clusters) {
    let leftCols = findVerticalMiddle(cluster);  
    if (leftCols > -1) {
      total += leftCols;
    }

    let topRows = findHorizontalMiddle(cluster);  
    if (topRows > -1) {
      total += (topRows * 100);
    }
  }
  return total;
}

const part2 = (data: string) => {
  let clusters = parseData(data);
  return clusters.length;
}


export const solve: Solution = (source) => {
  title("Day 13: Point of Incidence");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
