const { readFileSync } = require("fs");

console.log("XXX part 1");

let calculate = (inputs) => {
  let parsed = inputs.map(line => line);
  console.log(parsed);

  let result = 0;
  console.log(`Result = ${result}`);
};

let readInput = () => readFileSync(`./input.txt`, "utf-8").split(/\r?\n/);

const inputs = readInput();
let start = new Date().getTime();
calculate(inputs); // humnPath
console.log(`spent time: ${new Date().getTime() - start} ms`);
