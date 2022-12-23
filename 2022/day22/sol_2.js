const { readFileSync } = require("fs");

console.log("Monkey Map part 1");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let sideLen = 0;
let grid = [];
let direction = "R";
let directions = ["R", "D", "L", "U"];

// let directions = [[0, 1, 'R', '>'], [1, 0, 'D', 'v'], [0, -1, 'L', '<'], [-1, 0, 'U', '^']]; // row, col, name, symbol_on_map
// let direction = directions[0];

// let directionsPrint = { R: ">", D: "v", L: "<", U: "^" };

let findNextAllowPosOnGrid = (lookFrom, steps) => {
  let prevStep = lookFrom;
  let row = lookFrom[0];
  let col = lookFrom[1];

  while (steps > 0) {
    // console.log(`current cell = '${grid[row][col]}'`)
    if (grid[row][col] === "#") {
      return prevStep;
    }
    if (grid[row][col] === ".") {
      prevStep = [row, col];
      // grid[row][col] = directionsPrint[direction];
      steps--;
    }
    if (steps === 0) {
      return prevStep;
    }

    // prevStep = [row, col];
    // row = (row + direction[0] + grid.length) % grid.length;
    // col = (col + direction[1] + grid[row].length) % grid[row].length;
    if (direction === "R") {
      col = (col + 1) % grid[row].length;
    } else if (direction === "L") {
      col = (col - 1 + grid[row].length) % grid[row].length;
    } else if (direction === "D") {
      row = (row + 1) % grid.length;
    } else if (direction === "U") {
      row = (row - 1 + grid.length) % grid.length;
    }
  }
  return [row, col];
};

let isTurn = (c) => c === "L" || c === "R";

let turn = (dir) => {
  let curr = directions.indexOf(direction);
  let idxShift = dir === "R" ? 1 : -1;
  let nextIdx = (curr + idxShift + directions.length) % directions.length;
  direction = directions[nextIdx];
};

let parseCommands = (commands) => {
  let res = [];
  let item = "";
  for (let i = 0; i < commands.length; i++) {
    let c = commands[i];
    if (isTurn(c)) {
      res.push(Number(item));
      res.push(c);
      item = "";
    } else {
      item += c;
    }
  }
  res.push(Number(item));
  return res;
};

let calculate = (inputs) => {
  let [mapStr, commands] = inputs.split("\n\n");
  // console.log(mapStr)
  // console.log(commands)
  let mapLines = mapStr.split("\n");

  for (let line of mapLines) {
    let row = [];
    for (let i = 0; i < line.length; i++) {
      row.push(line.charAt(i));
    }
    grid.push(row);
  }
  // console.log("rows sizes", grid.map(row => row.length))
  // console.log("comms", commands)

  sideLen = grid[0].indexOf(".");
  let startPos = [0, sideLen]; // findNextAllowPosOnGrid([0, 0], 1);
  console.log("startPos", startPos);

  let pos = startPos;

  let cmds = parseCommands(commands);

  for (let cmd of cmds) {
    if (isTurn(cmd)) {
      turn(cmd);
    } else {
      pos = findNextAllowPosOnGrid(pos, cmd + 1);
    }
  }

  console.log("final pos", pos);

  // console.log(grid.map(row => row.join("")).join("\n"));

  let result =
    1000 * (pos[0] + 1) + 4 * (pos[1] + 1) + directions.indexOf(direction);
  console.log(`Result = ${result}`);
};

const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);

// 6444 - too high
// 1428
