import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

type Location = [number, number]; // row, col

let toStr = ([row, col]: [number, number]) => `${row},${col}`;

function generatePairs(locs: Location[]): [Location, Location][] {
  const pairs: [Location, Location][] = [];

  for (let i = 0; i < locs.length; i++) {
    for (let j = i + 1; j < locs.length; j++) {
      pairs.push([locs[i], locs[j]]);
    }
  }

  return pairs;
}

const isAntenna = /^[A-Za-z0-9]$/;

const getAntennasLocations = (board: string[]): Record<string, [number, number][]> => {
  let antLocMap: Record<string, [number, number][]> = {};
  // antLocMap['a'] = [1,1];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      let c = board[row][col];
      if (isAntenna.test(c)) {
        let locations = antLocMap[c] ?? [];
        locations.push([row, col]);
        antLocMap[c] = locations;
      }
    }
  }
  return antLocMap;
};

let validateOnBoard = (board: string[]) => ([r, c]: Location): boolean => {
  if (r >= 0 && r < board.length && c >= 0 && c < board[r].length) {
    return true;
  }
  return false;
}

const part1 = (data: string) => {
  const board = parseInput(data);

  let antLocMap: Record<string, [number, number][]> = getAntennasLocations(board);

  let isOnBoard = validateOnBoard(board);
  
  function findAntinodes([l1, l2]: [Location, Location]): Location[] {
    let dRow = l2[0] - l1[0];
    let dCol = l2[1] - l1[1];

    let l1AntiRow = l1[0] - dRow;
    let l1AntiCol = l1[1] - dCol;

    let l2AntiRow = l2[0] + dRow;
    let l2AntiCol = l2[1] + dCol;

    let l1Anti: Location = [l1AntiRow, l1AntiCol];
    let l2Anti: Location = [l2AntiRow, l2AntiCol];

    let res = [];
    if (isOnBoard(l1Anti)) {
      res.push(l1Anti);
    }
    if (isOnBoard(l2Anti)) {
      res.push(l2Anti);
    }

    return res;
  }

  let uniques = new Set<string>();
  for (let [ant, locs] of Object.entries(antLocMap)) {
    let pairs = generatePairs(locs);
    let antinodes = pairs.map(findAntinodes).flat();
    for (let loc of antinodes) {
      uniques.add(toStr(loc));
    }
  }

  return uniques.size;
};

const part2 = (data: string) => {
  const board = parseInput(data);
  let antLocMap: Record<string, [number, number][]> = getAntennasLocations(board);

  let isOnBoard = validateOnBoard(board);
  
  function findAntinodes([l1, l2]: [Location, Location]): Location[] {
    let dRow = l2[0] - l1[0];
    let dCol = l2[1] - l1[1];

    let res = [];
    for (let k=-board[0].length; k < board[0].length; k++) {
      let aRow = l1[0] + k * dRow;
      let aCol = l1[1] + k * dCol;
      if (isOnBoard([aRow, aCol]) ) {
        res.push([aRow, aCol] as Location);
      }
    }

    return res;
  }

  let uniques = new Set<string>();
  for (let [ant, locs] of Object.entries(antLocMap)) {
    let pairs = generatePairs(locs);
    let antinodes = pairs.map(findAntinodes).flat();
    for (let loc of antinodes) {
      uniques.add(toStr(loc));
    }
  }

  return uniques.size;
};

export const solve: Solution = (source) => {
  title("Day 8: Resonant Collinearity");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
