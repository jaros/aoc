const { readFileSync } = require("fs");

console.log("Monkey Math part 1");

let monkeyOps = {};

class Operation {
  val;
  opName;
  op1;
  op2;
  operator;

  constructor(val, opName, op1, op2, operator) {
    this.opName = opName;
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
    this.val = applyOperation(op1Val, op2Val, this.operator);
    return this.val;
  };

  findPathToChild = (path, searchName) => {
    let currentPath = [...path, this.opName];
    if (this.opName === searchName) {
      return [...path, this.opName];
    }
    if (!this.op1 && !this.op2) {
      return null;
    }
    return (
      monkeyOps[this.op1].findPathToChild(currentPath, searchName) ||
      monkeyOps[this.op2].findPathToChild(currentPath, searchName)
    );
  };
}

let applyOperation = (op1, op2, operator) => {
  switch (operator) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
  }
};

let oppositeOperation = (op) => {
  switch (op) {
    case "+":
      return "-";
    case "-":
      return "+";
    case "*":
      return "/";
    case "/":
      return "*";
  }
};

let getSecondOperand = (rootName, op1Name) => monkeyOps[rootName].op1 === op1Name ? monkeyOps[rootName].op2 : monkeyOps[rootName].op1;

let calculate = (inputs) => {
  inputs.forEach((line) => {
    let [opName, opStr] = line.split(": ");
    let opParts = opStr.split(" ");
    let operation =
      opParts.length === 1
        ? new Operation(Number(opParts[0]), opName)
        : new Operation(null, opName, opParts[0], opParts[2], opParts[1]);
    monkeyOps[opName] = operation;
  });

  let humnPath = monkeyOps["root"].findPathToChild([], "humn");
  // console.log(humnPath);

  humnPath.shift();

  let humnPathRoot = humnPath.shift();
  let monkeyPathRoot = getSecondOperand("root", humnPathRoot);
  let monkeySum = monkeyOps[monkeyPathRoot].calculate();

  // humnPathRoot == robotSum

  let equationResult = monkeySum;
  let equationRoot = humnPathRoot;

  while (humnPath.length !== 0) {
    let operandHuman = humnPath.shift();
    let rollbackOperator = oppositeOperation(monkeyOps[equationRoot].operator);

    // monkeyOps[equationRoot].operator special treat for '-' and '/'
    // c = op1 - op2
    // op1 = c + op2
    // op2 = op1 - c

    // c = op1 / op2
    // op1 = c * op2
    // op2 = op1 / c

   // need to find human op val

   let monkeyOp = getSecondOperand(equationRoot, operandHuman);
   let monkeyOpVal = monkeyOps[monkeyOp].calculate();

    let isOp1Monkey =  monkeyOps[equationRoot].op2 === operandHuman;
    let originalOperator = monkeyOps[equationRoot].operator;
    if (isOp1Monkey && (originalOperator === '-' || originalOperator === '/')) {
      equationResult = applyOperation(monkeyOpVal, equationResult, originalOperator);  
    } else {
      equationResult = applyOperation(equationResult, monkeyOpVal, rollbackOperator);
    }

    equationRoot = operandHuman;
  }

  console.log(`RobotSum = ${monkeySum}, equationResult: ${equationResult}`);
};

let readInput = () => readFileSync(`./input.txt`, "utf-8").split(/\r?\n/);

const inputs = readInput();
let start = new Date().getTime();
calculate(inputs); // humnPath
console.log(`spent time: ${new Date().getTime() - start} ms`)
