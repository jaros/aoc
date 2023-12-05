
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type Scratchcard = {
  cardNr: number;
  winCards: Set<string>;
  haveCards: string[];
}

let getScratchcards = (data: string): Scratchcard[] => {
  let cards = data.split("\n");
  let scratchcards = []
  for (let card of cards) {
    let [cardNumber, scores] = card.split(":");
    const cardNr = Number(cardNumber.split(/\s+/)[1]);
    let [winnig, having] = scores.trim().split("|");
    let winCards = new Set(winnig.trim().split(/\s+/));
    let haveCards = having.trim().split(/\s+/);
    scratchcards.push({ cardNr, winCards, haveCards });
  }
  return scratchcards;
}

const part1 = (data: string) => getScratchcards(data)
  .reduce(
    (total, card) =>
      total + card.haveCards.reduce((p, c) => card.winCards.has(c) ? (p == 0 ? 1 : p * 2) : p, 0),
    0);
//22488

const part2 = (data: string) => {
  let cards = getScratchcards(data);
  let totalCards: Record<number, number> = Object.fromEntries(cards.map(c => [c.cardNr, 1]));
  for (let {cardNr, haveCards, winCards} of cards) {
    let matches = haveCards.filter(c => winCards.has(c)).length;
    for (let i = cardNr + 1; i <= cardNr + matches; i++) {
      totalCards[i] += totalCards[cardNr];
    }
  }
  return Object.values(totalCards).reduce(sum);
}
//7013204

export const solve: Solution = (source) => {
  title("Day 4: Scratchcards");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
