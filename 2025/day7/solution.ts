import { e, re } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";


const getLines = (data: string): [number, string[]] => {
  const lines = data.split("\n");
  let startIdx = lines[0].indexOf("S");
  return [startIdx, lines];
}

const part1 = (data: string) => {
  const [startIdx, grid] = getLines(data);
  console.log("startIdx", startIdx);
  // console.log("grid", grid);

  let splitTimes = 0;
  let beams = new Set([startIdx]);
  for (let row = 1; row < grid.length; row++) {
    const newBeams: Set<number> = new Set<number>();
    for (const beam of beams) {
        // console.log("grid[row][beam]", grid[row][beam]);
      if (grid[row][beam] === ".") {
        newBeams.add(beam);
      } else if (grid[row][beam] === "^") {
        if (beam > 0) {
          const newBeam = beam - 1;
          newBeams.add(newBeam);
        }
        if (beam < grid[0].length - 1) {
          const newBeam = beam + 1;
          newBeams.add(newBeam);
        }
        splitTimes++;
        // console.log("split", grid[row][beam], row, beam);
      }
    }
    beams = newBeams;
  }
  return splitTimes;
};

const part2 = (data: string) => {
  const [startIdx, grid] = getLines(data);

  let splitTimes = 0;
  return splitTimes;
};

export const solve: Solution = (source) => {
  title("Day 7: Laboratories");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
