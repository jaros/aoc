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
  let order = Math.pow(SNAFU_BASE, snafu.length-1);
  for (let i=0; i < snafu.length; i++) {
    let val = numMap[snafu[i]];
    sum += (val * order);
    order /= SNAFU_BASE;
  }
  return sum;
}

let snafuBaseNormal = (decimalNum) => {
  let sum = '';
  let k=1;
  let fullPart = SNAFU_BASE;
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

    if (num > 4) {
      let mod = num % SNAFU_BASE;
      passOver = Math.floor(num/SNAFU_BASE);
      num = mod;
      parts[i] = num;
    } else {
      parts[i] = num; 
      passOver = 0;
    }
    
    if (num == 3) {
      parts[i] = '=';
      passOver += 1;
    } else if (num == 4) {
      parts[i] = '-';
      passOver += 1;
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
// console.log('314159265 -> 1121-1110-1=0 ', toSnafu(314159265))
// console.log('1747 -> 1=-0-2 ', toSnafu(1747))
console.log(`spent time: ${new Date().getTime() - start} ms`);

// 4890
// 124030
// 2=-1=0
