const { readFileSync } = require("fs");

console.log("Unstable Diffusion part 1");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let calculate = (inputs) => {
  console.log(inputs)
}


const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);

