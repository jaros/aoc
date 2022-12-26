const { readFileSync } = require("fs");

console.log("Day24 Blizzard Basin. part 1");

let readInput = () => readFileSync(`./test.txt`, "utf-8");

let calculate = (inputs) => {
  console.log(inputs)
}


const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);

