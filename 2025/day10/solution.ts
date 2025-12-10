
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Schema = string;
type Button = number[];
type Device = {schema: Schema, buttons: Button[]};

const getLines = (data: string) => data.split("\n")

const getDevices = (lines: string[]): Device[] => {
  return lines.map(line => {
    const [schemaStr, ...buttonsStr] = line.split(" ");
    const schema = schemaStr.substring(1, schemaStr.length-1) as Schema;
    buttonsStr.splice(buttonsStr.length-1, 1);
    const buttons = buttonsStr.map(str => {
      return str.substring(1, str.length-1).split(",").map(numStr => Number(numStr)) as Button;
    });
    return {schema, buttons}
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
    const newCombos = result.map(combo => [...combo, item]);
    result.push(...newCombos);
  }

  return result;
}

const countMinPresses = (device: Device): number => {
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
  return devices.map(d => countMinPresses(d)).reduce(sum);
}

const part2 = (data: string) => {
  const lines = getLines(data);
  return 0;
}

export const solve: Solution = (source) => {
  title("Day 10: Factory");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
