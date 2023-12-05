
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

type GameSet = Record<string, number>;
type Game = {
  nr: number;
  sets: GameSet[];
}

const loadGames = (data: string): Game[] => data.split("\n").map(line => {
  let [gNr, sets] = line.split(": ");
  let gameSetsStrings = sets.split("; ");
  let gameSets = gameSetsStrings.map(set => set.split(", ").map(cube => {
    let [cubeCount, cubeColor] = cube.split(" ");
    return [cubeColor, Number(cubeCount)];
  }));
  return {
    nr: Number(gNr.split(" ")[1]),
    sets: gameSets.map(s => Object.fromEntries(s) as GameSet)
  };
});

const part1 = (data: string) => {
  const gameLimits: GameSet = {
    red: 12,
    green: 13,
    blue: 14
  };
  return loadGames(data)
    .filter(g => g.sets.map(Object.entries).every(set => set.every(([color, count]) => count <= gameLimits[color])))
    .map(g => g.nr)
    .reduce(sum);
}

const part2 = (data: string) => {
  let getMin = (acc: Record<string, number>, curr: Record<string, number>) => {
    for (let color in curr) {
      acc[color] = Math.max(curr[color], acc[color]);
    }
    return acc;
  }
  let initAcc = () => ({
    red: 0,
    green: 0,
    blue: 0
  });
  let sets: GameSet[] = loadGames(data).map(game => game.sets.reduce(getMin, initAcc()));

  return sets.map(set => Object.values(set).reduce((acc, curr) => acc * curr)).reduce(sum);
}

export const solve: Solution = (source) => {
  title("Day 2: Cube Conundrum");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
