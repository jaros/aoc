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
  let dirKey = getNextDirection(elfLoc);
  if (dirKey === null) {
    return null;
  }

  let [dy, dx] = directions[dirKey];
  return [y + dy, x + dx];
};

let getNextDirection = (elfLoc) => {
  // check whether can move at all
  if (!hasNeighbour(elfLoc)) {
    return null;
  }
  if (!hasNeighbourAt(elfLoc, ['N', 'NE', 'NW'])) {
    return 'N';
  } else if (!hasNeighbourAt(elfLoc, ['S', 'SE', 'SW'])) {
    return 'S';
  } else if (!hasNeighbourAt(elfLoc, ['W', 'NW', 'SW'])) {
    return 'W';
  } else if (!hasNeighbourAt(elfLoc, ['E', 'NE', 'SE'])) {
    return 'E';
  }
  return null;
}

let locKey = (loc) => `${loc[0]},${loc[1]}`;

let moveElf = (move) => {
 let [from, to] = move;
 grid[from[0]][from[1]] = '.';
 grid[to[0]][to[1]] = '#';
}

let calculate = (inputs) => {
  console.log(inputs);
  let lines = inputs.split("\n");
  grid = lines.map((line) => line.split(""));

  let elvesLocations = getInitialElvesLocation();

  let round = 10;
  while(round--> 0) {
    let nextLocations = elvesLocations.map(getElfNextPosition);
    let locToElves = {};
    for (let i=0; i < nextLocations.length; i++) {
      let loc = locKey(nextLocations[i]);
      let elvesIndices = locToElves[loc] || [];
      elvesIndices.push(i);
      locToElves[loc] = elvesIndices;
    }
    let nextLocMove = [];
    for (let i=0; i < nextLocations.lenght; i++) {
      let from = elvesLocations[i];
      let to = from;
      let toMaybe = nextLocations[i];
      if (locToElves[locKey(toMaybe)].length === 1) {
        to = toMaybe;
      }
    }
    nextLocMove.forEach(moveElf);
    elvesLocations = nextLocMove.map(m => m.to);
  }
  
  console.log('\n\n');
  console.log(grid.map(row => row.join('')).join('\n'));
};

const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
