const { readFileSync } = require("fs");

console.log("2015 day1. Not Quite Lisp.");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let calculate = (inputs) => {
  // console.log(inputs)
  let upCount = 0;
  for (let i =0; i < inputs.length; i++) {
    if (inputs[i] === '(') {
      upCount++;
    }
  }
  console.log("finish floor", upCount*2 - inputs.length);
}

let calculate_part2 = (inputs) => {
  // console.log(inputs)
  let current = 0;
  for (let i =0; i < inputs.length; i++) {
    if (inputs[i] === '(') {
      current++;
    } else {
      current--;
    }
    if (current === -1) {
      console.log("-1 idx", i+1);    
      return;
    }
  }
  // console.log("finish floor", current);
}


const inputs = readInput();
let start = new Date().getTime();
calculate_part2(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
// 1794 -- too low
