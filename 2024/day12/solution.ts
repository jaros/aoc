import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

type Area = number[][];

type Region = {
  symbol: string;
  area: Area;
};

const adj4 = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const toKey = ([row, col]: number[]) => `${row},${col}`;
const toPerKey = ([p1, p2]: number[][]) => toKey(p1) + "," + toKey(p2);

let countPerimeter = (area: Area): number => {
  // To calculate the perimeter, create a set of the area coordinates for quick lookup
  let areaSet = new Set(area.map(toKey));
  let perimeter = 0;

  for (let [row, col] of area) {
    // Check each of the four directions (up, down, left, right)
    for (let [dRow, dCol] of adj4) {
      let nCell = [row + dRow, col + dCol];
      if (!areaSet.has(toKey(nCell))) {
        // No more neighbors in this direction
        perimeter++; // No neighbor above
      }
    }
  }
  return perimeter;
};

const buildRegions = (grid: string[][]): Region[] => {
  const regions: Region[] = [];
  let visited = new Set<string>();

  const withinGrid = ([r,c]: number[]) => {
    return r >= 0 && r < grid.length && c >= 0 && c < grid[r].length;
  }

  // BFS search for neigbors
  let floodFill = (symbol: string, row: number, col: number, area: Area) => {
    let stack = [[row, col]];

    while (stack.length > 0) {
      let [r, c] = stack.pop()!;
      let key = toKey([r, c]);

      if (visited.has(key) || grid[r][c] !== symbol) {
        continue;
      }

      visited.add(key);
      area.push([r, c]);

      // Add neighbors to the stack
      for (let [dRow, dCol] of adj4) {
        let nCell = [r + dRow, c + dCol];
        if (withinGrid(nCell)) {
          stack.push(nCell);
        }
      }
    }
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let symbol = grid[row][col];
      let key = toKey([row, col]);

      if (!visited.has(key)) {
        let area: Area = [];
        floodFill(symbol, row, col, area);
        regions.push({ symbol, area });
      }
    }
  }
  return regions;
}

const part1 = (data: string) => {
  let grid = parseInput(data).map((line) => line.split(""));

  const regions: Region[] = buildRegions(grid);

  let areaByPerimeter = regions.map((region) => {
    let size = region.area.length;
    let perimeter = countPerimeter(region.area);
    return size * perimeter;
  });
  return areaByPerimeter.reduce(sum);
};

let countPerimeterSides = (area: Area): number => {
   // To calculate the perimeter, create a set of the area coordinates for quick lookup
   let areaSet = new Set(area.map(toKey));
   let perimeter = [];
   let sides = 0;
 
   for (let [row, col] of area) {
     // Check each of the four directions (up, down, left, right)
     for (let [dRow, dCol] of adj4) {
       let nCell = [row + dRow, col + dCol];
       if (!areaSet.has(toKey(nCell))) {
         // No more neighbors in this direction
         perimeter.push([[row, col], nCell]); // No neighbor above
       }
     }
   }

   let perSet = new Set(perimeter.map(toPerKey));
   for (let [p1,p2] of perimeter) {
    let keep = true;
    for (let [dx, dy] of [[1, 0], [0, 1]]) {
      let p1n = [p1[0]+dx, p1[1]+dy];
      let p2n = [p2[0]+dx, p2[1]+dy];
      if (perSet.has(toPerKey([p1n, p2n]))) {
        keep = false;
      }
    }
    if (keep) {
      sides++;
    }
   }

   return sides;
}

const part2 = (data: string) => {
  let grid = parseInput(data).map((line) => line.split(""));

  const regions: Region[] = buildRegions(grid);

  let areaByPerimeter = regions.map((region) => {
    let size = region.area.length;
    let perimeter = countPerimeterSides(region.area);
    return size * perimeter;
  });
  return areaByPerimeter.reduce(sum);
};

export const solve: Solution = (source) => {
  title("Day 12: Garden Groups");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
