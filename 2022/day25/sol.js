const { readFileSync } = require("fs");

console.log("Day24 Blizzard Basin. part 1");

let readInput = () => readFileSync(`./test.txt`, "utf-8");

const SNAFU_BASE = 5;

let snafuMap = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2
};

let decMap = {
  2: 2,
  1: 1,
  0: 0,
  3: '=',
  4: '-'
};

let toDecimal = (snafu) => {
  let order = snafu.length;
  return snafu.split('').reduce((acc, c) => acc + snafuMap[c] * Math.pow(SNAFU_BASE, --order), 0);
}

let toSnafu = (dec) => {
  let res = [];
  while (dec > 0) {
    let minOrder = dec % SNAFU_BASE;
    res.unshift(decMap[minOrder]);
    if (minOrder > 2) {
      dec += (SNAFU_BASE - minOrder);
    }
    dec = Math.floor(dec / SNAFU_BASE);
  }
  return res.join('');
}


let calculate = (inputs) => {
  // console.log(inputs)
  let snafus = inputs.split("\n");
  let snafusSumInDecimal = snafus.reduce((acc, snafu) => acc + toDecimal(snafu), 0);
  console.log(snafusSumInDecimal)
  let snafuSum = toSnafu(snafusSumInDecimal);
  console.log(snafuSum)
}


const inputs = readInput();
let start = new Date().getTime();
calculate(inputs);
// console.log('7 -> 12 ', toSnafu(7));
// console.log('5 -> 10 ', toSnafu(5));
// console.log('10 -> 20 ', toSnafu(10));
// console.log('3 -> 1= ', toSnafu(3));
// console.log('4 -> 1- ', toSnafu(4));
// console.log('8 -> 2= ', toSnafu(8))
// console.log('20 -> 1-0 ', toSnafu(20))
// console.log('2022 -> 1=11-2 ', toSnafu(2022))
// console.log('314159265 -> 1121-1110-1=0 ', toSnafu(314159265))
// console.log('1747 -> 1=-0-2 ', toSnafu(1747))
console.log(`spent time: ${new Date().getTime() - start} ms`);

// 4890
// 124030
// 2=-1=0
