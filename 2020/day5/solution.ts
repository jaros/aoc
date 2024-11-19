
import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string): string[] => data.split("\n");

const TOTAL_ROWS = 127;
const SEATS_IN_ROW = 7;

const parseTicket = (line: string) => {
  let i = 0;
  let l = 0;
  let r = TOTAL_ROWS
  let mid = 0;
  while (i < 7) {
    if (line[i] == 'F') { // front - lower
      mid = Math.floor((l+r)/2);
      r = mid;
    } else if (line[i] == 'B') { // back - upper
      mid = Math.ceil((l+r)/2);
      l = mid;
    }
    i++;
  }
  const row = mid;

  l = 0;
  r = SEATS_IN_ROW
  mid = 0;
  while (i < 10) {
    if (line[i] == 'R') { // right - upper
      mid = Math.ceil((l+r)/2);
      l = mid;
    } else if (line[i] == 'L') { // left - lower
      mid = Math.floor((l+r)/2);
      r = mid;
    }
    i++;
  }
  const col = mid; 

  const ticketId = row * 8 + col;

  return ticketId;
}

const part1 = (data: string) => {
  let lines = parseInput(data);
  let ticketIds = lines.map(ticket => parseTicket(ticket));
  return Math.max(...ticketIds);
};

const part2 = (data: string) => {
  
};

export const solve: Solution = (source) => {
  title("Day 5: Binary Boarding");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
