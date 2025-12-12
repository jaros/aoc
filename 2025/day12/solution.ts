
import { Solution, readInput, title, withTime } from "../../common/types";

const getBlocks = (data: string) => data.split("\n\n")

const part1 = (data: string) => {
  const blocks = getBlocks(data);
  const presentsShapes: Array<{shape: string[], area: number}> = [];
  blocks.slice(0, blocks.length - 1).forEach((block, _idx) => {
    let lines = block.split("\n").slice(1); // skip first line
    presentsShapes.push({shape: lines, area: lines.map(l => l.split("").filter(c => c === "#").length).reduce((a,b) => a + b, 0)});
  });

  const isFit = (sumArea: number, presentQuantities: number[]) => {
    let presentsArea = 0;
    for (let i = 0; i < presentQuantities.length; i++) {
      presentsArea += presentQuantities[i] * presentsShapes[i].area;
    }
    return sumArea >= presentsArea;
  }

  const trees = blocks.at(-1)!.split("\n");
  return trees.reduce((count, line) => {
    let [dimensions, presentIndices] = line.split(": ");
    let [rows, cols] = dimensions.split("x").map(Number);
    let sumArea = rows * cols;
    let presentQuantities = presentIndices.split(" ").map(s => parseInt(s));
    return isFit(sumArea, presentQuantities) ? count + 1 : count;
  }, 0);
}

const part2 = (data: string) => {
  return 0
}

export const solve: Solution = (source) => {
  title("Day 12: Christmas Tree Farm");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
