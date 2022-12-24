const { readFileSync } = require("fs");

console.log("2015 day2. I Was Told There Would Be No Math.");

let readInput = () => readFileSync(`./input.txt`, "utf-8");

let calculate = (inputs) => {
  // console.log(inputs)
  let res = 0;
  let lines = inputs.split("\n");
  for (line of lines) {
    let allSides = line.split("x").map(c => Number(c));
    allSides.sort((a, b) => a - b);
    // console.log(allSides)
    let [l, w, h] = allSides;
    let surface = (2 * l * w + 2 * l * h + 2 * w * h);
    let slack = allSides[0] * allSides[1];
    let giftNeed = surface + slack;
    // console.log("surface", surface, "slack", slack)
    res += giftNeed;
  }
  
  console.log("sq feet", res);
}

let calculate_part2 = (inputs) => {
  let res = 0;
  let lines = inputs.split("\n");
  for (line of lines) {
    let allSides = line.split("x").map(c => Number(c));
    allSides.sort((a, b) => a - b);
    // console.log(allSides)
    let [l, w, h] = allSides;
    let bow = (l * w  * h);
    let slack = 2*allSides[0] + 2*allSides[1];
    let giftNeed = slack + bow;
    // console.log("surface", surface, "slack", slack)
    res += giftNeed;
  }
  
  console.log("ribbon len", res);
  
}


const inputs = readInput();
let start = new Date().getTime();
calculate_part2(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);
// 1692704 -- too high
// 1586300
