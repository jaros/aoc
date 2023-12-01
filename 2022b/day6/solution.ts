
import { Solution, readInput, title, withTime } from "../../common/types";

const findMarkerEndIndex = (data: string, markerLength: number) => {
  const marker = [];
  let markerIdx = 0;
  while (markerIdx < markerLength) {
    marker.push(data.charAt(markerIdx++));  
  }

  while(new Set(marker).size < markerLength) {
    marker.shift();
    marker.push(data.charAt(markerIdx++))
  }

  return markerIdx;
}

const part1 = (data: string) => {
  return findMarkerEndIndex(data, 4)
};

const part2 = (data: string) => {
  return findMarkerEndIndex(data, 14)
};

export const solve: Solution = (source) => {
  title("Day 6: Tuning Trouble");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
