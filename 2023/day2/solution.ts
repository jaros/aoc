
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

let transpile: Record<string, string> = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'
}

let wins = [['X', 'Z'], ['Z', 'Y'], ['Y', 'X']];

let getScore = (me: string, op: string) =>
  me == op ? 3
    : wins.find(it => me == it[0] && op == it[1]) ? 6
      : 0;

const getGames = (data: string) => data.split('\n').map(line => line.split(' '));

const count = (data: string, gameScore: (result: string[]) => string[]) => {
  let sum = 0;
  for (let res of getGames(data)) {
    const [me, op] = gameScore(res);
    sum += (moveScore[me] + getScore(me, op));
  }
  return sum;
}

const part1 = (data: string) => count(data, ([op, me]) => [me, transpile[op]]);


let getMyMove = (op: string, res: string): string => {
  switch (res) {
    case 'Y': // draw
      return op;
    case 'Z': // win
      return wins.find(([_, o]) => o == op)?.[0] ?? '';
    default: // lose X
      return wins.find(([me, _]) => me == op)?.[1] ?? '';
  }
}

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const part2 = (data: string) => count(data, ([op, res]) => {
  const opponent = transpile[op];
  return [getMyMove(opponent, res), opponent];
});

export const solve: Solution = (source) => {
  title("Rock Paper Scissors.");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
