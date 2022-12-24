const { readFileSync } = require("fs");
const crypto = require('crypto')


console.log("2015 day4. The Ideal Stocking Stuffer.");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let dirMoves = {
  '>': [0, 1],
  '<': [0, -1],
  'v': [1, 0],
  '^': [-1, 0],
};

let toStr = (pos) => `${pos[0]}, ${[pos[1]]}`;

// let md5 = crypto.createHash('md5');

let calculate = (inputs) => {
  let secret = inputs;
  let hash = '';
  let salt=0;
  while (!hash.startsWith('00000')) {
    salt++;
    hash = crypto.createHash('md5').update(secret + salt).digest("hex");
  }
  console.log(hash)
  console.log(salt)

  console.log("num", 0);
}

let calculate_part2 = (inputs) => {
  
}


const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
// 1692704 -- too high
// 1586300
