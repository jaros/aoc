
import { i } from "mathjs";
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Schema = string;
type Button = number[];
type Joltage = number[];
type Device = {schema: Schema, buttons: Button[], joltage: Joltage};

const getLines = (data: string) => data.split("\n")

const getDevices = (lines: string[]): Device[] => {
  return lines.map(line => {
    const [schemaStr, ...rest] = line.split(" ");
    const schema = schemaStr.substring(1, schemaStr.length-1) as Schema;
    const restNums = rest.map(str => {
      return str.substring(1, str.length-1).split(",").map(numStr => Number(numStr)) as Button;
    });
    const buttons = restNums.slice(0, rest.length-1);
    const joltage = restNums.at(-1) as Joltage;
    // console.log({schema, buttons, joltage})
    return {schema, buttons, joltage}
  })
}

const schemaState = (schema: Schema): boolean[] => {
  const state: boolean[] = [];
  for (let ch of schema) {
    state.push(ch == '#');
  }
  return state;
}

function getAllCombinations<T>(arr: T[]): T[][] {
  const result: T[][] = [[]]; // start with empty set

  for (const item of arr) {
    const newCombos: T[][] = [];
    for (let combo of result) {
      let nRes = []
      for (let c of combo) {
        nRes.push(c);
      }
      nRes.push(item);
      newCombos.push(nRes)
    }
    // const newCombos = result.map(combo => [...combo, item]);
    for (let c of newCombos) {
      result.push(c)
    }
    // result.push(...newCombos);
  }

  return result;
}

const countMinPressesForSchemaMatch = (device: Device): number => {
  const finalState = schemaState(device.schema);
  const equalToSchema = (other: boolean[]): boolean => {
    for (let i = 0; i < finalState.length; i++) {
      if (finalState[i] != other[i]) {
        return false;
      }
    }
    return true;
  };

  const press = (state: boolean[], btn: number[]) => {
    for (let idx of btn) {
      state[idx] = !state[idx];
    }
  }

  let minTimes = Number.MAX_SAFE_INTEGER;;
  
  const combos = getAllCombinations(device.buttons);
  for (const combo of combos) {
    let currentState: boolean[] = Array(device.schema.length).fill(false);
    let times = 0;
    for (let btn of combo) {
      press(currentState, btn);
      times++;
      if (equalToSchema(currentState)) {
        minTimes = Math.min(minTimes, times);
        break;
      }
      if (times > minTimes) {
        break;
      }
    }
  }

  return minTimes;
}

const part1 = (data: string) => {
  const devices = getDevices(getLines(data));
  return devices.map(d => countMinPressesForSchemaMatch(d)).reduce(sum);
}

const countMinPressesForJoltageMatch = (device: Device): number => {
  const press = (counters: number[], btn: number[]) => {
    for (let idx of btn) {
      counters[idx]++;
    }
  }

  const compareToJoltage = (counters: number[]): "same" | "less" | "over" => {
    let same = 0;
    for (let i = 0; i < device.joltage.length; i++) {
      if (counters[i] > device.joltage[i]) {
        return "over";
      } else if (counters[i] == device.joltage[i]) {
        same++;
      }
    }
    return same == counters.length ? "same" : "less";
  };

  let minTimes = Number.MAX_SAFE_INTEGER;
  
  const visited: Set<string> = new Set();
  const toComboRecord = (combo: number[]) => combo.join();

  // queue for BFS
  const q: Array<{pressed: number[], count: number, joltage: Joltage}> = [];
  // first time init with single button press
  for (let i=0; i < device.buttons.length; i++) {
    let btn = device.buttons[i];
    const joltage =  Array(device.joltage.length).fill(0);
    press(joltage, btn);
    const combo = Array(device.buttons.length).fill(0)
    combo[i] = 1
    q.push({pressed: combo, count: 1, joltage})
  }

  
  while (q.length > 0) {
    const {pressed, count, joltage} = q.shift()!;
    if (count >= minTimes) {
      continue;
    }
    visited.add(toComboRecord(pressed));
    const res = compareToJoltage(joltage);
    if (res == "same") {
      minTimes = Math.min(minTimes, count);
    } else if (res == "less") {
      for (let i=0; i < device.buttons.length; i++) {
        let btn = device.buttons[i];
        let newPressed = [...pressed];
        newPressed[i]++;
        if (visited.has(toComboRecord(newPressed))) {
          continue;
        }
        let newJoltage = [...joltage];
        press(newJoltage, btn);
        q.push({ pressed: newPressed, count: count+1, joltage: newJoltage });
      }
    } else {
        // over, do nothing
    }
  }

  return minTimes;
}

const part2 = (data: string) => {
  const devices = getDevices(getLines(data));
  return devices.map(d => countMinPressesForJoltageMatch(d)).reduce(sum);
}

export const solve: Solution = (source) => {
  title("Day 10: Factory");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
