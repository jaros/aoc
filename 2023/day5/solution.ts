
import { Solution, readInput, title, withTime } from "../../common/types";

type MapConvert = {
  destStart: number;
  sourceStart: number;
  rangeLength: number;
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
      return { destStart, sourceStart, rangeLength };
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
      let end = map.sourceStart + map.rangeLength;
      if (source >= map.sourceStart && source < end) {
        return source + (map.destStart - map.sourceStart);
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

const part2 = (data: string) => {
  let input = parseInput(data);
  let seeds = [];
  for (let i = 0; i < input.seeds.length; i += 2) {
    let from = input.seeds[i];
    let len = input.seeds[i + 1];
    let to = from + len;
    // console.log("from", from, "to", to)
    for (let k = from; k < to; k++) {
      seeds.push(k);
    }
  }

  // console.log("seeds", seeds)
  // console.log(JSON.stringify(input, null, 2))

  let findDest = (source: number, maps: MapConvert[]): number => {
    for (let map of maps) {
      let end = map.sourceStart + map.rangeLength;
      if (source >= map.sourceStart && source < end) {
        return source + (map.destStart - map.sourceStart);
      }
    }
    return source;
  }

  let maps: Record<number, number>[] = [];
  for (let i = 0; i < input.convertersDescr.length; i++) {
    let descr = input.convertersDescr[i];
    let sources = i == 0 ? seeds : Object.values(maps[i - 1]);
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

export const solve: Solution = (source) => {
  title("Day 5: If You Give A Seed A Fertilizer");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
