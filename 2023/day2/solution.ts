
import { Solution, readInput, title, withTime } from "../../common/types";

type CubeColor = "red" | "green" | "blue";
type GameSet = Record<CubeColor, number>;
type Game = {
  nr: number;
  sets: GameSet[];
}

const loadGames = (data: string): Game[] => data.split("\n").map(line => {
  let [gNr, sets] = line.split(": ");
  let gameSetsStrings: string[] = sets.split("; ");
  let gameSets = gameSetsStrings.map(set => set.split(", ").map(cube => {
    let [cubeCount, cubeColor] = cube.split(" ");
    return [cubeColor as CubeColor, Number(cubeCount)];
  }));
  return {
    nr: Number(gNr.split(" ")[1]),
    sets: gameSets.map(s => Object.fromEntries(s) as GameSet)
  };
});

const part1 = (data: string) => {
  const games = loadGames(data);
  const gameLimits: GameSet = {
    red: 12,
    green: 13,
    blue: 14
  };
  return games.map(game =>
    game.sets.every(set => (set.blue ?? 0) <= gameLimits.blue && (set.red ?? 0) <= gameLimits.red && (set.green ?? 0) <= gameLimits.green)
      ? game.nr : 0).reduce((a, b) => a + b, 0);
}

const part2 = (data: string) => {
  const games = loadGames(data);

  let initCount = () => ({
    red: 0,
    green: 0,
    blue: 0
  });

  let minGames: { nr: number; set: GameSet }[] = games.map(game => ({
    nr: game.nr,
    set: game.sets.reduce((acc, curr) => {
      acc.blue = Math.max(curr.blue ?? 0, acc.blue);
      acc.green = Math.max(curr.green ?? 0, acc.green);
      acc.red = Math.max(curr.red ?? 0, acc.red);
      return acc;
    }, initCount())
  }));

  return minGames.map(g => {
    let power = 1;
    if (g.set.blue) {
      power *= g.set.blue;
    }
    if (g.set.green) {
      power *= g.set.green;
    }
    if (g.set.red) {
      power *= g.set.red;
    }
    return power;
  }).reduce((a, b,) => a + b, 0);

}

export const solve: Solution = (source) => {
  title("Day 2: Cube Conundrum");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
