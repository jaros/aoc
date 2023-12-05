
import { Solution, readInput, title, withTime } from "../../common/types";
import { min } from "../utils";

type MapConvert = {
  dst: number;
  src: number;
  size: number;
}

type ConverterDescription = {
  title: string;
  mapConverters: MapConvert[];
}

type GardenInput = {
  seeds: number[];
  convertersDescr: ConverterDescription[];
}

const parseInput = (data: string): GardenInput => {
  let [seedBlock, ...mapBlocks] = data.split("\n\n");
  let seeds = seedBlock.split(": ")[1].split(" ").map(Number);
  let convertersDescr = mapBlocks.map<ConverterDescription>(convert => {
    let [title, ...convs] = convert.split("\n");
    let mapConverters = convs.map<MapConvert>(conv => {
      let [destStart, sourceStart, rangeLength] = conv.split(" ").map(Number);
      return { dst: destStart, src: sourceStart, size: rangeLength };
    });
    return { title, mapConverters }
  });
  return { seeds, convertersDescr };
}

const part1 = (data: string) => {
  let input = parseInput(data);
  // console.log(JSON.stringify(input, null, 2))

  let findDest = (source: number, maps: MapConvert[]): number => {
    for (let map of maps) {
      let end = map.src + map.size;
      if (source >= map.src && source < end) {
        return source + (map.dst - map.src);
      }
    }
    return source;
  }

  let maps: Record<number, number>[] = [];
  for (let i = 0; i < input.convertersDescr.length; i++) {
    let descr = input.convertersDescr[i];
    let sources = i == 0 ? input.seeds : Object.values(maps[i - 1]);
    let currentMapping: Record<number, number> = {};
    for (let source of sources) {
      let dest = findDest(source, descr.mapConverters);
      currentMapping[source] = dest;
    }
    // console.log("currentMapping", currentMapping);
    maps.push(currentMapping);
  }

  // lowest location
  return Math.min(...Object.values(maps[maps.length - 1]));
}

const applyMappings = (
  ranges: Array<[number, number]>,
  maps: ConverterDescription[]
): Array<[number, number]> => {
  for (const map of maps) {
      const match: Array<[number, number]> = [];
      let remains: Array<[number, number]> = [...ranges];
      for (const {dst, src, size} of map.mapConverters) {
          const newRemains: Array<[number, number]> = [];
          for (const range of remains) { // upstream
              const transit = intersect(
                  range,
                  [src, src + size - 1],
                  dst - src
              );
              match.push(...transit.match);
              newRemains.push(...transit.remains); // remains is what not found in mapping - remains equal to source
          }
          remains = mergeOverlappingRanges(newRemains);
      }
      ranges = mergeOverlappingRanges([...match, ...remains]);
  }

  return ranges;
}

const intersect = (
  a: [number, number], // 30, 31
  b: [number, number], // 20, 30
  offset: number
): { match: Array<[number, number]>; remains: Array<[number, number]> } => {
  if (a[1] < b[0] || a[0] > b[1]) {
    // console.log("source doesn't overlap with range") 
    return {
          match: [],
          remains: [a]
      };
  } else if (a[0] < b[0] && a[1] > b[1]) {
    // console.log("source covers range") 
    return {
          match: [[b[0] + offset, b[1] + offset]],
          remains: [
            [a[0], b[0] - 1],
            [b[1] + 1, a[1]]
          ]
      };
  } else if (a[0] >= b[0] && a[1] <= b[1]) {
    // console.log("source inside range")
      return {
          match: [[a[0] + offset, a[1] + offset]],
          remains: []
      };
  } else if (a[0] < b[0]) {
    // console.log("source intersects by right side")
      return {
          match: [[b[0] + offset, a[1] + offset]],
          remains: [[a[0], b[0] - 1]]
      };
  } else {
    // console.log("source intersects by left side")
      return {
          match: [[a[0] + offset, b[1] + offset]],
          remains: [[b[1] + 1, a[1]]]
      };
  }
}

const mergeOverlappingRanges = (ranges: Array<[number, number]>) => {
  if (ranges.length < 2) {
      return ranges;
  }
  ranges.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const result: Array<[number, number]> = [];
  let [first, ...restRanges] = ranges;
  let [l, r] = first;
  for (let [nextL, nextR] of restRanges) {
    if (r < nextL) {
      result.push([l, r]);
      l = nextL;
      r = nextR;
    } else {
      r = Math.max(r, nextR);
    }
  }
  result.push([l, r]);
  return result;
}

const part2 = (data: string) => {
    const { seeds, convertersDescr } = parseInput(data);

    const ranges: Array<[number, number]> = [];
    for (let i = 0; i < seeds.length; i += 2) {
        ranges.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
    }
    return applyMappings(ranges, convertersDescr).map(range => range[0]).reduce(min);
}

export const solve: Solution = (source) => {
  title("Day 5: If You Give A Seed A Fertilizer");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
