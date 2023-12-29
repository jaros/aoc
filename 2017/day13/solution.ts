import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Layer = { range: number, pos: number, inc: 1 | -1 };

let initLayers: Layer[] = [];
let scannerLayers: number[] = [];

let simulateScanner = (layers: Layer[]) => {
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

let isCaught = (layers: Layer[]) => {
  for (let packIdx = 0; packIdx < layers.length; packIdx++) {
    if (layers[packIdx]?.pos == 1) {
      return true;
    }
    simulateScanner(layers);
  }
  return false;
}

let init = (data: string) => {
  initLayers = [];
  scannerLayers = [];
  for (let row of data.split('\n')) {
    let [depth, range] = row.split(': ').map(Number)
    initLayers[depth] = { range, pos: 1, inc: 1 };
    scannerLayers.push(depth);
  }
}

const part1 = (data: string) => {
  init(data);
  let layers = initLayers;
  let total = 0;

  for (let packIdx = 0; packIdx < layers.length; packIdx++) {
    if (layers[packIdx]?.pos == 1) {
      total += packIdx * layers[packIdx].range;
    }
    simulateScanner(layers);
  }
  return total;
};

const part2 = (data: string) => {
  init(data);
  let skip = 0;
  let ll: Layer[] = initLayers;
  while (true) {
    simulateScanner(ll);
    skip++;
    if (!isCaught(initLayers.map(l => ({ ...l })))) { // if (!isCaught(JSON.parse(JSON.stringify(initLayers)))) { // 41.74 vs 8.66 => 80% diff
      break;
    }
  }
  return skip;
};

export const solve: Solution = (source) => {
  title("Day 14: Packet Scanners");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
