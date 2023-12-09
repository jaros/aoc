
import { Solution, readInput, title, withTime } from "../../common/types";

type Direction = 'N' | 'S' | 'E' | 'W';

type Turn = 'L' | 'R';

let getNextDir = (currentDir: Direction, turn: Turn): Direction => {
  switch (currentDir) {
    case 'N': return turn == 'L' ? 'W' : 'E';
    case 'E': return turn == 'L' ? 'N' : 'S';
    case 'S': return turn == 'L' ? 'E' : 'W';
    case 'W': return turn == 'L' ? 'S' : 'N';
    default: throw new Error('wrong turn')
  }
}

const dirLine: Record<Direction, 'x' | 'y'> = {
  N: 'y',
  S: 'y',
  E: 'x',
  W: 'x'
}

const part1 = (data: string) => {
  let x = 0;
  let y = 0;
  
  let currDir = 'N' as Direction;

  let dirs = data.split(', ')

  for (let dir of dirs) {
    let s = Number(dir.slice(1));
    let nextDir = getNextDir(currDir, dir[0] as Turn);
    
    if (nextDir == 'N') {
      y += s;
    } else if (nextDir == 'S') {
      y -= s;
    } else if (nextDir == 'E') {
      x += s;
    } else if (nextDir == 'W') {
      x -= s;
    } else {
      throw new Error('wrong dir')
    }
    currDir = nextDir;
  }
  return Math.abs(x) + Math.abs(y);
};

const part2 = (data: string) => {
  let pos = {
    x: 0,
    y: 0
  }
  
  let currDir = 'N' as Direction;
  let positions: Record<string, number> = {x0y0: 1};

  let isVisitTwice = (): boolean => {
    let key = `x${pos.x}y${pos.y}`;
    if (positions[key]) {
      return true;
    } else {
      positions[key] = 1;
      return false;
    }
  }

  let move = (dir: Direction) => {
    if (dir == 'N' || dir == 'E') {
      pos[dirLine[dir]]++;
    } else {
      pos[dirLine[dir]]--;
    }
  }

  for (let dir of data.split(', ')) {
    let times = Number(dir.slice(1));
    let nextDir = getNextDir(currDir, dir[0] as Turn);

    do {
      move(nextDir);
    } while (--times > 0 && !isVisitTwice())

    currDir = nextDir;

    if (isVisitTwice()) {
      break;
    }
  }
  return Math.abs(pos.x) + Math.abs(pos.y);
};

export const solve: Solution = (source) => {
  title("Day 1: No Time for a Taxicab");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
