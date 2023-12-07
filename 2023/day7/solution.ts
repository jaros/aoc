
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type HandInput = {
  hand: string;
  bid: number;
};
type Input = HandInput[];

enum Type {
  FIVE_OF_A_KIND = 7,
  FOUR_OF_A_KIND = 6,
  FULL_HOUSE = 5,
  THREE_OF_A_KIND = 4,
  TWO_PAIR = 3,
  ONE_PAIR = 2,
  HIGH_CARD = 1
}

let getSimpleType = (hand: string): Type => {
  let counter: Record<string, number> = {};
  for (let i=0; i<hand.length; i++) {
    counter[hand[i]] = (counter[hand[i]] ?? 0) + 1;
  }
  let counts = Object.values(counter);
  if (counts.includes(5)) {
    return Type.FIVE_OF_A_KIND;
  }
  if (counts.includes(4)) {
    return Type.FOUR_OF_A_KIND;
  }
  if (counts.includes(3) && counts.includes(2)) {
    return Type.FULL_HOUSE;
  }
  if (counts.includes(3)) {
    return Type.THREE_OF_A_KIND;
  }
  if (counts.includes(2) && counts.length == 3) {
    return Type.TWO_PAIR;
  }
  if (counts.includes(2)) {
    return Type.ONE_PAIR;
  }
  return Type.HIGH_CARD;
}

let getTypeWithJoker = (hand: string): Type => {
  let counter: Record<string, number> = {};
  for (let i=0; i<hand.length; i++) {
    counter[hand[i]] = (counter[hand[i]] ?? 0) + 1;
  }
  const cards = Object.entries(counter);
  
  if (cards.find(([t, c]) => c + counter['J'] >= 5)) {
    return Type.FIVE_OF_A_KIND;
  }
  
  if (cards.find(([t, c]) => c == 4 || c == 3 && counter['J'] == 1 || c == 2 && t != 'J' && counter['J'] == 2 || counter['J'] == 3)) {
    return Type.FOUR_OF_A_KIND;
  }

  if (cards.length == 2 || cards.length == 3 && counter['J'] == 1) {
    return Type.FULL_HOUSE;
  }
  if (cards.find(([t, c]) => c == 3 || c == 2 && t == 'J' || c == 2 && t != 'J' && counter['J'] == 1)) {
    return Type.THREE_OF_A_KIND;
  }

  if (cards.find(([t, c]) => (c == 2 && cards.length == 3) || (c == 2 && t != 'J' && counter['J'] == 1))) {
    return Type.TWO_PAIR;
  }
  if (cards.find(([t, c]) => c == 2 || t == 'J')) {
    return Type.ONE_PAIR;
  }
  return Type.HIGH_CARD;
}

let compareByTypeAndStrength = (cardsStrength: string[], getType: (hand: string) => Type) => (aIn: HandInput, bIn: HandInput) => {
  let a = aIn.hand;
  let b = bIn.hand;
  let aType = getType(a);
  let bType = getType(b);
  let res = aType - bType;
  if (res == 0) {
    for (let i=0; i < a.length; i++) {
      if (cardsStrength.indexOf(a[i]) != cardsStrength.indexOf(b[i])) {
        return cardsStrength.indexOf(b[i]) - cardsStrength.indexOf(a[i]);
      }
    }
  }
  return res;
}

let getInput = (data: string): Input => {
  return data.split('\n').map(line => {
    let [hand, bid] = line.split(' ');
    return {hand, bid: Number(bid)};
  });
}

let countScore = (input: Input): number => input.map((val, idx) => val.bid * (idx + 1)).reduce(sum);

const part1 = (data: string) => {
  let cardsStrength = 'A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2'.split(', ');
  let input: Input = getInput(data);
  input.sort(compareByTypeAndStrength(cardsStrength, getSimpleType));
  return countScore(input);
}

const part2 = (data: string) => {
  let cardsStrength = 'A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J'.split(', ');
  let input: Input = getInput(data);
  
  input.sort(compareByTypeAndStrength(cardsStrength, getTypeWithJoker));

  return countScore(input);
}
//249817836

export const solve: Solution = (source) => {
  title("Day 7: Camel Cards");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
