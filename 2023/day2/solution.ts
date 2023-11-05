
import { Solution, readInput, title, withTime } from "../../common/types";

// Opponent
// A for Rock, B for Paper, and C for Scissors

// me
// X for Rock, Y for Paper, and Z for Scissors

// scoring
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

let moveScore: Record<string, number> = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

let movesAling: Record<string, string> = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'
}

let getScore = (op: string, me: string) => {
  if (op == me) {
    return 3;
  }
  if ((me == 'X' && op == 'Z') || (me == 'Z' && op == 'Y') || (me == 'Y' && op == 'X')) {
    return 6;
  }
  return 0;
}

const part1 = (data: string) => {
  let games = data.split("\n");
  let sum = 0;
  for (let game of games) {
    let [op, me] = game.split(' ');
    sum += moveScore[me];
    sum += getScore(movesAling[op], me);
  }
  console.log("part 1 score:", sum);
}


let getMyMove = (op: string, res: string) {
  
}

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const part2 = (data: string) => {
  let games = data.split("\n");
  let sum = 0;

  console.log("part 2", );
}

export const solve: Solution = (source) => {
  title("Rock Paper Scissors.");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
