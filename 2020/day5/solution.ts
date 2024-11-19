
import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string): string[] => data.split("\n");

const TOTAL_ROWS = 127;
const SEATS_IN_ROW = 7;

const binarySearcher = (line: string) => (from: number, to: number, max: number, lowerSign: string, upperSign: string) => {
  let i = from;
  let l = 0;
  let r = max
  let mid = 0;
  while (i < to) {
    if (line[i] == lowerSign) { // front/left - lower
      mid = Math.floor((l+r)/2);
      r = mid;
    } else if (line[i] == upperSign) { // back/right - upper
      mid = Math.ceil((l+r)/2);
      l = mid;
    }
    i++;
  }
  return mid;
}

const parseTicket = (line: string) => {
  const findValue = binarySearcher(line);
  const row = findValue(0, 7, TOTAL_ROWS, 'F', 'B');
  const col = findValue(7, 10, SEATS_IN_ROW, 'L', 'R'); 
  const ticketId = row * 8 + col;
  return ticketId;
}

const part1 = (data: string) => {
  let lines = parseInput(data);
  let ticketIds = lines.map(ticket => parseTicket(ticket));
  return Math.max(...ticketIds);
};

const part2 = (data: string) => {
  let lines = parseInput(data);
  let ticketIds = lines.map(ticket => parseTicket(ticket)).sort((a, b) => a-b);
  let curr = ticketIds[0];
  let i = 1;
  while (i < ticketIds.length) {
    let next = ticketIds[i++];
    if (next - curr !== 1) {
      return next -1;
    }
    curr = next;
  }
  return -1;
};

export const solve: Solution = (source) => {
  title("Day 5: Binary Boarding");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
