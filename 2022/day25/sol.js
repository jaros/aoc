const { readFileSync } = require("fs");

console.log("Day24 Blizzard Basin. part 1");

let readInput = () => readFileSync(`./test.txt`, "utf-8");

const SNAFU_BASE = 5;

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
    sum += (val * place);
  }
  return sum;
}

let snafuBaseNormal = (decimalNum) => {
  let sum = '';
  let k=1;
  let fullPart = 5;
  while (decimalNum >= fullPart) {
    fullPart = fullPart * SNAFU_BASE; 
    k++;
  } 

  k--;
  fullPart /= SNAFU_BASE;

  while (k > 0) {
   let t = Math.floor(decimalNum / fullPart);
   sum += t;
   decimalNum -= t * fullPart;
   fullPart /= SNAFU_BASE;
   k--;
  }
  sum += decimalNum;
  return sum;
}

let toSnafu = (decimalNum) => {
  let sum = snafuBaseNormal(decimalNum);
  let passOver = 0;
  let parts = sum.split('');
  console.log(sum)
  for (let i=parts.length - 1; i >= 0; i--) {
    let num = Number(parts[i]);
    num += passOver;
    passOver = 0;
    parts[i] = num; 
    if (num == 3) {
      parts[i] = '=';
      passOver = 1;
    } else if (num == 4) {
      parts[i] = '-';
      passOver = 1;
    } else if (num > 4) {
      let mod = num % SNAFU_BASE;
      parts[i] = num-mod;
      passOver = mod;
    }
  }
  if (passOver > 0) {
    parts.unshift(passOver);
  }
	
  return parts.join(''); 
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
console.log(`spent time: ${new Date().getTime() - start} ms`);

// 2-05==12-122-=1-1-22    NOT