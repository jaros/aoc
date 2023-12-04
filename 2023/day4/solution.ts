
import { Solution, readInput, title, withTime } from "../../common/types";

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

const part1 = (data: string) => {
  let cards = getScratchcards(data);
  let total = 0;
  for (let card of cards) {
    let points = 0;
    for (let c of card.haveCards) {
      if (card.winCards.has(c)) {
        points = points == 0 ? 1 : points * 2;
      }
    }
    total += points;
  }
  return total;
}

const part2 = (data: string) => {
  let cards = getScratchcards(data);
  let totalCards: Record<number, number> = Object.fromEntries(cards.map(c => [c.cardNr, 1]));
  for (let card of cards) {
    let matches = 0;
    for (let c of card.haveCards) {
      if (card.winCards.has(c)) {
        matches++;
      }
    }
    for (let i = 1; i <= matches; i++) {
      let cardNr = card.cardNr;
      totalCards[cardNr + i] = totalCards[cardNr + i] + totalCards[cardNr];
    }
  }
  return Object.values(totalCards).reduce((a, b) => a + b);
}

export const solve: Solution = (source) => {
  title("Day 4: Scratchcards");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
