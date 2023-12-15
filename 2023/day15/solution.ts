
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

let hashStep = (current: number, charCode: number): number => {
  current += charCode;
  current *= 17;
  current %= 256;
  return current;
}

let hash = (value: string): number => {
  let current = 0;
  for (let i=0; i < value.length; i++) {
    current = hashStep(current, value.charCodeAt(i));
  }  
  return current;
}

const part1 = (data: string) => {
  return data.split(',').map(hash).reduce(sum)
}

type Lens = {
  label: string;
  focal: number;
}

const part2 = (data: string) => {
  let input = data.split(',');
  let boxes: Record<number, Lens[]> = {};
  for (let i=0; i < input.length; i++) {
    let lensOp = input[i];
    if (lensOp[lensOp.length-1] == '-') {
      let [label] = lensOp.split('-');
      let box = hash(label);
      if (boxes[box]) {
        boxes[box] = boxes[box].filter(lens => lens.label != label);
      }
    } else {
      let [label, focal] = lensOp.split('=');
      let newLens = {label, focal: Number(focal)};
      let box = hash(label);
      if (boxes[box]) {
        let idx = boxes[box].findIndex(lens => lens.label == label);
        if (idx == -1) {
          boxes[box].push(newLens);
        } else {
          boxes[box][idx] = newLens;
        }
      } else {
        boxes[box] = [newLens];
      }
    }
  }

  let total = 0;
  for (let [box, lenses] of Object.entries(boxes)) {
    let boxNr = Number(box) + 1;
    for (let i=0; i<lenses.length; i++) {
      let lensPower = (boxNr * (i+1) * lenses[i].focal);
      total += lensPower;
    }
  }
  return total;
}

export const solve: Solution = (source) => {
  title("Day 15: Lens Library");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
