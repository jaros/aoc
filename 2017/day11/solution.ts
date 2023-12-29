
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";


const part1 = (data: string) => {
  let x = 0;
  let y = 0;
  let z = 0;

  // https://www.redblobgames.com/grids/hexagons/
  let calcDistance = () => (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2


  let move = (dir: string) => {
    switch (dir) {
      case 'n':
        y += 1
        z -= 1
        break;
      case 's':
        y -= 1
        z += 1
        break;
      case 'ne':
        x += 1
        z -= 1
        break;
      case 'sw':
        x -= 1
        z += 1
        break;
      case 'nw':
        x -= 1
        y += 1
        break;
      case 'se':
        x += 1
        y -= 1
        break;

    }
  }

  for (let dir of data.split(',')) {
    move(dir);
  }
  return calcDistance();
}


const part2 = (data: string) => {
  let x = 0;
  let y = 0;
  let z = 0;

  // https://www.redblobgames.com/grids/hexagons/
  let calcDistance = () => (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2


  let move = (dir: string) => {
    switch (dir) {
      case 'n':
        y += 1
        z -= 1
        break;
      case 's':
        y -= 1
        z += 1
        break;
      case 'ne':
        x += 1
        z -= 1
        break;
      case 'sw':
        x -= 1
        z += 1
        break;
      case 'nw':
        x -= 1
        y += 1
        break;
      case 'se':
        x += 1
        y -= 1
        break;

    }
  }

  let dists = []

  for (let dir of data.split(',')) {
    move(dir);
    dists.push(calcDistance())
  }
  return Math.max(...dists);
}

export const solve: Solution = (source) => {
  title("Day 11: Hex Ed");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
