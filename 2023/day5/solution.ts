
import { Solution, readInput, title, withTime } from "../../common/types";

type MapConvert = {
  destFrom: number;
  sourceFrom: number;
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
      return { destFrom: destStart, sourceFrom: sourceStart, rangeLength };
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
      let end = map.sourceFrom + map.rangeLength;
      if (source >= map.sourceFrom && source < end) {
        return source + (map.destFrom - map.sourceFrom);
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

type Range = {
  from: number; // inclusive
  to: number; // inclusive
}

type Component = {
  title: string;
  ranges: Range[];
}

const part2 = (data: string) => {
  let input = parseInput(data);
  let seeds: Range[] = [];
  for (let i = 0; i < input.seeds.length; i += 2) {
    let from = input.seeds[i];
    let len = input.seeds[i + 1];
    let to = from + len -1;
    // console.log("from", from, "to", to)
    // for (let k = from; k < to; k++) {
    //   seeds.push(k);
    // }
    seeds.push({from, to});
  }

  // console.log("seeds ranges", seeds)
  // console.log(JSON.stringify(input, null, 2))

  // there can be multiple ranges overlaps with one source range
  let findDest = (source: Range, maps: MapConvert[]): Range => {
    let ranges = [];
    for (let map of maps) {
      let mapSourceTo = map.sourceFrom + map.rangeLength - 1;
      // find if source overlaps with mapSourceTo
      if (source.from <= mapSourceTo && source.to >= map.sourceFrom) {
        let from = Math.max(source.from, map.sourceFrom);
        let to = Math.min(source.to, mapSourceTo);
        let diff = map.destFrom - map.sourceFrom;
        ranges.push( { from: from + diff, to: to + diff });
      }
    }
    if (ranges.length == 0) {
      return {from: source.from, to: source.to};
    }
    else {
      ranges.sort((a, b) => {
        let min = a.from - b.from;
        return min == 0 ? a.to - b.to : min;
      });
      console.log("sorted ranges", ranges);
      return ranges[0];
    }
    // console.log("ranges", ranges);
    // return ranges.length ? ranges : [{from: source.from, to: source.to}];
  }

  let maps: Component[] = [];
  for (let i = 0; i < input.convertersDescr.length; i++) {
    let descr = input.convertersDescr[i];
    let sources = i == 0 ? seeds : maps[i - 1].ranges;
    let currentMapping: Range[] = [];
    for (let source of sources) {
      let dest = findDest(source, descr.mapConverters);
      currentMapping.push(dest);
    }
    // currentMapping.sort((a, b) => a.from - b.from);
    maps.push({title: descr.title, ranges: currentMapping});
  }

  // lowest location
  console.log("maps", maps);
  let locationsStartRanges = maps[maps.length - 1].ranges.map(r => r.from);
  return Math.min(...locationsStartRanges);
}

export const solve: Solution = (source) => {
  title("Day 5: If You Give A Seed A Fertilizer");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
