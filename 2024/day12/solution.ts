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


let countPerimeter = (area: Area): number => {
   // To calculate the perimeter, create a set of the area coordinates for quick lookup
   let areaSet = new Set(area.map(([r, c]) => `${r},${c}`));
   let perimeter = 0;
 
   for (let [row, col] of area) {
     // Check each of the four directions (up, down, left, right)
     if (!areaSet.has(`${row - 1},${col}`)) {
       perimeter++; // No neighbor above
     }
     if (!areaSet.has(`${row + 1},${col}`)) {
       perimeter++; // No neighbor below
     }
     if (!areaSet.has(`${row},${col - 1}`)) {
       perimeter++; // No neighbor to the left
     }
     if (!areaSet.has(`${row},${col + 1}`)) {
       perimeter++; // No neighbor to the right
     }
   }
 
   return perimeter;
}

const buildRegions = (grid: string[][]): Region[] => {
  const regions: Region[] = [];
  let visited = new Set<string>();

  // BFS search for neigbors
  let floodFill = (symbol: string, row: number, col: number, area: Area) => {
    let stack = [[row, col]];

    while (stack.length > 0) {
      let [r, c] = stack.pop()!;
      let key = `${r},${c}`;

      if (visited.has(key) || grid[r][c] !== symbol) {
        continue;
      }

      visited.add(key);
      area.push([r, c]);

      // Add neighbors to the stack
      if (r > 0) stack.push([r - 1, c]); // up
      if (r < grid.length - 1) stack.push([r + 1, c]); // down
      if (c > 0) stack.push([r, c - 1]); // left
      if (c < grid[0].length - 1) stack.push([r, c + 1]); // right
    }
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let symbol = grid[row][col];
      let key = `${row},${col}`;

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
    // console.log(region.symbol, size, perimeter)
    return size * perimeter;
  });
  return areaByPerimeter.reduce((a, b) => a + b, 0);
};

let countPerimeterSides = (area: Area): number => {
  let areaSet = new Set(area.map(([r, c]) => `${r},${c}`));
  let sideSet = new Set<string>();

  // Helper to check if a cell is outside the region
  const isBoundary = (row: number, col: number) => !areaSet.has(`${row},${col}`);

  // Collect all perimeter edges into sideSet
  for (let [row, col] of area) {
    if (isBoundary(row - 1, col)) {
      sideSet.add(`H,${row},${col}`); // Top edge
    }
    if (isBoundary(row + 1, col)) {
      sideSet.add(`H,${row + 1},${col}`); // Bottom edge
    }
    if (isBoundary(row, col - 1)) {
      sideSet.add(`V,${row},${col}`); // Left edge
    }
    if (isBoundary(row, col + 1)) {
      sideSet.add(`V,${row},${col + 1}`); // Right edge
    }
  }

  // Function to count contiguous straight lines from sideSet
  const countLines = (sideSet: Set<string>): number => {
    let visited = new Set<string>();
    let lines = 0;

    for (let side of sideSet) {
      if (visited.has(side)) continue;

      // Start a new line
      lines++;
      let [type, row, col] = side.split(",");
      row = parseInt(row);
      col = parseInt(col);

      // Explore connected edges
      let queue = [[type, row, col]];
      while (queue.length > 0) {
        let [curType, curRow, curCol] = queue.pop()!;
        let key = `${curType},${curRow},${curCol}`;

        if (!sideSet.has(key) || visited.has(key)) continue;
        visited.add(key);

        // Check neighbors for continuation of the line
        if (curType === "H") {
          if (sideSet.has(`H,${curRow},${curCol - 1}`)) queue.push(["H", curRow, curCol - 1]); // Horizontal left
          if (sideSet.has(`H,${curRow},${curCol + 1}`)) queue.push(["H", curRow, curCol + 1]); // Horizontal right
        } else if (curType === "V") {
          if (sideSet.has(`V,${curRow - 1},${curCol}`)) queue.push(["V", curRow - 1, curCol]); // Vertical up
          if (sideSet.has(`V,${curRow + 1},${curCol}`)) queue.push(["V", curRow + 1, curCol]); // Vertical down
        }
      }
    }

    return lines;
  };

  // Count and return the number of contiguous lines forming the perimeter
  return countLines(sideSet);
}

// 897612 -- too low
const part2 = (data: string) => {
  let grid = parseInput(data).map((line) => line.split(""));

  const regions: Region[] = buildRegions(grid);

  let areaByPerimeter = regions.map((region) => {
    let size = region.area.length;
    let perimeter = countPerimeterSides(region.area);
    console.log(region.symbol, size, perimeter)
    return size * perimeter;
  });
  return areaByPerimeter.reduce((a, b) => a + b, 0);
};

export const solve: Solution = (source) => {
  title("Day 12: ");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
