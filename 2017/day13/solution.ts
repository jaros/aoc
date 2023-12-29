import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const part1 = (data: string) => {
  let layers: Array<{ range: number, pos: number, inc: 1 | -1 }> = [];
  let scannerLayers: number[] = [];

  for (let row of data.split('\n')) {
    let [depth, range] = row.split(': ').map(Number)
    layers[depth] = { range, pos: 1, inc: 1 };
    scannerLayers.push(depth);
  }
  let total = 0;

  for (let packIdx = 0; packIdx < layers.length; packIdx++) {
    if (layers[packIdx]?.pos == 1) {
      total += packIdx * layers[packIdx].range;
    }
    for (let sc of scannerLayers) {
      let l = layers[sc];
      if (l.inc == 1 && l.pos == l.range) {
        l.inc = -1;
      } else if (l.inc == -1 && l.pos == 1) {
        l.inc = 1;
      }
      l.pos += l.inc;
    }
  }
  return total;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 14: Packet Scanners");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
