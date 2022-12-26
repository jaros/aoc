const { readFileSync } = require("fs");

console.log("2022 Day 23. Unstable Diffusion. part 1");

let readInput = () => readFileSync(`./test.txt`, "utf-8");

let directions = {
  N: [-1, 0],
  NE: [-1, 1],
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
  NW: [-1, -1],
};

let grid = [];

let getInitialElvesLocation = () => {
  let elvesLocations = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        elvesLocations.push([y, x]);
      }
    }
  }
  return elvesLocations;
};

let hasNeighbour = (loc) => {
  for (let dir of Object.values(directions)) {
    let y = loc[0] + dir[0];
    let x = loc[1] + dir[1];
    if (grid[y][x] === "#") {
      return true;
    }
  }
  return false;
};

let hasNeighbourAt = (elfLoc, checkDirs) => {
  for (let dirKey of checkDirs) {
    let dir = directions[dirKey]
    let y = elfLoc[0] + dir[0];
    let x = elfLoc[1] + dir[1];
    if (grid[y][x] === "#") {
      return true;
    }
  }
  return false;
};

let getElfNextPosition = (elfLoc) => {
  let [y, x] = elfLoc;
  // check whether can move at all
  if (!hasNeighbour(elfLoc)) {
    return null;
  } else if (!hasNeighbourAt(elfLoc, ['N', 'NE', 'NW'])) {
    let dir = directions['N'];
    return [y + dir[0], x + dir[1]];
  } else if (!hasNeighbourAt(elfLoc, ['S', 'SE', 'SW'])) {
    let dir = directions['S'];
    return [y + dir[0], x + dir[1]];
  } else if (!hasNeighbourAt(elfLoc, ['W', 'NW', 'SW'])) {
    let dir = directions['W'];
    return [y + dir[0], x + dir[1]];
  } else if (!hasNeighbourAt(elfLoc, ['E', 'NE', 'SE'])) {
    let dir = directions['E'];
    return [y + dir[0], x + dir[1]];
  } else {
    return null;
  }
};

let calculate = (inputs) => {
  console.log(inputs);
  let lines = inputs.split("\n");
  grid = lines.map((line) => line.split(""));

  let elvesLocations = getInitialElvesLocation();

  let round = 10;
  while(round--> 0) {
    let nextLocations = elvesLocations.map(getElfNextPosition);
  }

  console.log(elvesLocations);
};

const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
