
import { Solution, readInput, title, withTime } from "../../common/types";

const parseGrid = (data: string): number[][] => data.split('\n').map(line => line.split('').map(Number)); 

const part1 = (data: string) => {
  let grid = parseGrid(data);
  
  let edge = grid.length * 4 - 4;

  // max rows 

  // max cols

  let interior = 0;

  for (let r = 1; r < grid.length-1; r++) {
    for (let c = 1; c < grid.length-1; c++) {
      let tree = grid[r][c];
      // console.log("tree", tree)
      let left = false;
      let right = false;
      let up = false;
      let down = false;
    }
  }

  return edge + interior;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 8: Treetop Tree House");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
