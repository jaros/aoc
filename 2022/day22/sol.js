const { readFileSync } = require("fs");

console.log("Monkey Map part 1");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let grid = [];
let direction = "R";
let directions = ["R", "D", "L", "U"];
let directionsPrint = { R: ">", D: "v", L: "<", U: "^" };

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

let moveInDirection = (steps, pos) => {
  // console.log("moving", steps, direction);
  return findNextAllowPosOnGrid(pos, steps + 1);
};

let turnClockwise = () => {
  let curr = directions.indexOf(direction);
  direction = directions[(curr + 1) % directions.length];
};

let turnCounterClockwise = () => {
  let curr = directions.indexOf(direction);
  direction = directions[(curr - 1 + directions.length) % directions.length];
};

let turn = (dir) => {
  switch (dir) {
    case "R":
      return turnClockwise();
    case "L":
      return turnCounterClockwise();
  }
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

  let startPos = findNextAllowPosOnGrid([0, 0], 1);
  console.log("startPos", startPos);

  let pos = startPos;

  let stepAcc = "";
  for (let i = 0; i < commands.length; i++) { // && i < 12
    let c = commands[i];
    // console.log(c)
    if (c >= "0" && c <= "9") {
      stepAcc += c;
      //last move
      if (i == commands.length - 1) {
        let steps = Number(stepAcc);
        pos = moveInDirection(steps, pos);
      }
    } else {
      let steps = Number(stepAcc);
      pos = moveInDirection(steps, pos);
      stepAcc = "";
      turn(c);
    }
  }

  console.log("final pos", pos)

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