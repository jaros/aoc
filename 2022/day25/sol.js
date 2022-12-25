const { readFileSync } = require("fs");

console.log("Day24 Blizzard Basin. part 1");

let readInput = () => readFileSync(`./test.txt`, "utf-8");

let numMap = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2
};

let toDecimal = (snafu) => {
  let sum = 0;
  for (let i=0; i < snafu.length; i++) {
    let val = numMap[snafu[i]];
    let place = Math.pow(5, snafu.length-i-1);
    // console.log(val, place);
    sum += (val * place);
  }
  return sum;
}

let toSnafu = (decimalNum) => {
  let sum = '';
  let decStr = (decimalNum+'').split('');

  let shift = -2;


  for (let i = decStr.length-1; i >= 0; i--) {
    let val = decStr[i];

  }

  console.log(decStr)
  return decStr;
}

let calculate = (inputs) => {
  // console.log(inputs)
  let snafus = inputs.split("\n");
  // let snafusSumInDecimal = 0;
  let = snafusSumInDecimal = snafus.reduce((acc, snafu) => acc + toDecimal(snafu), 0);
  // for (let snafu of snafus) {
  //   let decimalNum = toDecimal(snafu);
  //   snafusSumInDecimal += decimalNum;
  //   // console.log(decimalNum);
  // }
  let snafuSum = toSnafu(snafusSumInDecimal);
  console.log(snafuSum.join(""))
}


const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
console.log(`spent time: ${new Date().getTime() - start} ms`);

