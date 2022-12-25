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

// 2=-1=0
// 5 -> 10
let toSnafu = (decimalNum) => {
  let sum = '';
//  let decStr = (decimalNum+'').split('');
  let base = 5;
  let k=1;
  let fullPart = 5;
  while (decimalNum >= fullPart) {
    fullPart = fullPart * base; 
    k++;
    //console.log('full part', fullPart, 'k', k);
  } 

  k--;
  fullPart /= base;

  //console.log('==> ',k, fullPart)
  //let prevDiff = 0;
  while (k > 0) {
   let t = Math.floor(decimalNum / fullPart);
   //t += prevDiff;
   if (t == 3) {
    //t = 1;
    preDiff = 2;
   } else if (t == 4) {
    //t =1;
   }
   sum += t;
   decimalNum -= t * fullPart;
   fullPart /= base;
   k--;
  }
  sum += decimalNum;

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
    }
    else if (num > 4) {
      passOver = num % base;
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
// calculate(inputs);
// toSnafu(125)
console.log('7 -> 12 ', toSnafu(7));
console.log('5 -> 10 ', toSnafu(5));
console.log('10 -> 20 ', toSnafu(10));
console.log('3 -> 1= ', toSnafu(3));
console.log('4 -> 1- ', toSnafu(4));
console.log('8 -> 2= ', toSnafu(8))
console.log(`spent time: ${new Date().getTime() - start} ms`);

