const { readFileSync } = require("fs");

console.log("Monkey Math part 1");

const data = readFileSync(`./input.txt`, "utf-8");
const inputs = data.split(/\r?\n/);

let monkeyOps = {};

class Operation {
  val;
  op1;
  op2;
  operator;

  constructor(val, op1, op2, operator) {
    this.val = val;
    this.op1 = op1;
    this.op2 = op2;
    this.operator = operator;
  }

  calculate = () => {
    if (this.val !== null) {
      return this.val;
    }
    let op1Val = monkeyOps[this.op1].calculate();
    let op2Val = monkeyOps[this.op2].calculate();
    switch (this.operator) {
      case '+':
        this.val = op1Val + op2Val;
        return this.val;;
      case '-':
        this.val = op1Val - op2Val;
        return this.val;
      case '*':
        this.val = op1Val * op2Val;
        return this.val;
      case '/':
        this.val = op1Val / op2Val;
        return this.val;  
    }
  };
}

let calculate = () => {
  // console.log(inputs.join("\n"));

  inputs.forEach((line) => {
    let [opName, opStr] = line.split(": ");
    let opParts = opStr.split(" ");
    let operation =
      opParts.length === 1
        ? new Operation(Number(opParts[0]))
        : new Operation(null, opParts[0], opParts[2], opParts[1]);
    monkeyOps[opName] = operation;
  });

  let rootRes = monkeyOps['root'].calculate();
  console.log(`Number: ${rootRes}`);
};

calculate();
