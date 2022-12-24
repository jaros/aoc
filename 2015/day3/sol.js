const { readFileSync } = require("fs");

console.log("2015 day3. Perfectly Spherical Houses in a Vacuum.");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let dirMoves = {
  '>': [0, 1],
  '<': [0, -1],
  'v': [1, 0],
  '^': [-1, 0],
};

let toStr = (pos) => `${pos[0]}, ${[pos[1]]}`;

let calculate = (inputs) => {

  let visitedMap = new Set();
  let pos = [0, 0];
  visitedMap.add(toStr(pos))

  // console.log(visitedMap)
  let lines = inputs.split("");
  // console.log(lines)
  for (let dir of lines) {
    let dirM = dirMoves[dir];
    pos = [pos[0] + dirM[0], pos[1] + dirM[1]]
    visitedMap.add(toStr(pos))
  }

  
  console.log("houses", visitedMap.size);
}

let calculate_part2 = (inputs) => {
  let visited = new Set();
  // let visitedRobot = new Set();
  let santaPos = [0, 0];
  let robotPos = [0, 0];
  visited.add(toStr(santaPos))
  // visitedRobot.add(toStr(robotPos))

  // console.log(visitedMap)
  let lines = inputs.split("");
  // console.log(lines)
  for (let i=0; i < lines.length; i++) {
    let dir = lines[i];
    let dirM = dirMoves[dir];
    if (i % 2 === 0) {
      santaPos = [santaPos[0] + dirM[0], santaPos[1] + dirM[1]]  
      visited.add(toStr(santaPos))
    } else {
      robotPos = [robotPos[0] + dirM[0], robotPos[1] + dirM[1]]  
      visited.add(toStr(robotPos))
    }
  }

  
  console.log("houses", visited.size);
}


const inputs = readInput();
let start = new Date().getTime();
calculate_part2(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
// 1692704 -- too high
// 1586300
