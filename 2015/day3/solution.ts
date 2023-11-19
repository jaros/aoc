
import { Solution, readInput, title, withTime } from "../../common/types";

const initTracking = () => {
  let x =0;
  let y =0;
  let current = () => `${x},${y}`;
  let visited = new Set<string>();
  visited.add(current());
  return {
    move: (c: string) => {
      switch(c) {
        case '^': y++; break;
        case 'v': y--; break;
        case '>': x++; break;
        case '<': x--; break;
      }
      visited.add(current());  
    },
    visited,
    count: (other?: Set<string>): number => other ? new Set([...other, ...visited]).size : visited.size,
  } 
}

const part1 = (data: string) => {
  let santa = initTracking();
  for (let i=0; i < data.length; i++) {
    santa.move(data.charAt(i));
  }
  return santa.count();
};

const part2 = (data: string) => {
  let santa = initTracking();
  let robot = initTracking();
  let party = (i: number) => i % 2 == 0 ? santa : robot;
  for (let i=0; i < data.length; i++) {
    party(i).move(data.charAt(i));
  }
  return santa.count(robot.visited);
};

export const solve: Solution = (source) => {
  title("Day 3: Perfectly Spherical Houses in a Vacuum");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
