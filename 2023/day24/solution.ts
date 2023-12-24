import { Solution, readInput, title, withTime } from "../../common/types";

class Hailstone {
  public a: number;
  public b: number;
  public c: number;
  
  constructor(public sx: number, public sy: number, public sz: number, public vx: number, public vy: number, public vz: number) {
    this.a = vy;
    this.b = -vx;
    this.c = vy * sx  - vx * sy;
  }
}

let toHailstone = ([sx,sy,sz,vx,vy,vz]: number[]) => new Hailstone(sx,sy,sz,vx,vy,vz);

const part1 = (data: string) => {
  let hailstones = data.split('\n').map(line => line.replace(' @', ',').split(', ').map(Number)).map(toHailstone)
  let total = 0;
  for (let i=0; i< hailstones.length; i++) {
    let hs1 = hailstones[i];
    for (let j=0; j < i; j++) {
      let hs2 = hailstones[j];
      let a1 = hs1.a;
      let b1 = hs1.b;
      let c1 = hs1.c;
      let a2 = hs2.a;
      let b2 = hs2.b;
      let c2 = hs2.c;

      if (a1 * b2 == b1 * a2) {
        continue;
      }

      let x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)
      let y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1)

      if (200000000000000 <= x && x <= 400000000000000 && 200000000000000 <= y && y <= 400000000000000) {
        if ([hs1, hs2].every(hs => (x - hs.sx) * hs.vx >= 0 && (y - hs.sy) * hs.vy >= 0)) {
          total++;
        }
      }
    }
  }
  return total;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 24: Never Tell Me The Odds");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
