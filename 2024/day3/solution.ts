import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => data.split("\n");

const countMulSum = (data: string): number => {
  let res = data.match(/mul\([0-9]+\,[0-9]+\)/g);
  let nums = res?.map((p) => {
    let [n1, nn2] = p.split("mul(")[1].split(",");
    let n2 = nn2.split(")")[0];
    return Number(n1) * Number(n2);
  });
  return nums?.reduce((a, b) => a + b, 0) ?? 0;
}

const part1 = (data: string) => {
  return countMulSum(data);
};

const part2 = (data: string) => {
  let currStr = data;
  let res = 0;
  while (currStr.length > 0) {
    let cutStartIdx = currStr.indexOf("don't()");
    if (cutStartIdx == -1) {
      // console.log("no more stoppers", currStr)
      res += countMulSum(currStr);
      break;
    }
    let [acc, ...rest] = currStr.split("don't()");
    res += countMulSum(acc);
    // console.log("summing before stop", acc, res)
    let restString = rest.join("don't()");
    let cutEndIdx = restString.indexOf("do()");
    if (cutEndIdx == -1) {
      // console.log("no more start - exit")
      break;
    }
    const [cutPart, ...rr] = restString.split("do()");
    // console.log("cut out part", cutPart)
    currStr = rr.join("do()");
    // console.log("rest part", currStr)
  }
  return res;
};

export const solve: Solution = (source) => {
  title("Day 3: Mull It Over");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
