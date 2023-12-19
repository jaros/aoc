
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";


type Rating = {[key: string]: number}

type Workflow = {rules: Array<{key:string, cmp: string, n: number, target: string}>, fallback: string};

const ops = {
  '>': (a: number, b: number) => a > b,
  '<': (a: number, b: number) => a < b
};

type OpsType = keyof typeof ops;

const part1 = (data: string) => {
  let [workflows, ratingsLines] = data.split('\n\n')

  let ratings: Rating[] = ratingsLines.split('\n').map(line => {
    line = line.slice(1, line.length - 1);
    return Object.fromEntries(line.split(',').map(s => s.split('=')).map(([k, v]) => [k, Number(v)]));
  });

  let map: Record<string, Workflow> = {};
  workflows.split('\n').forEach(line => {
    let [key, rulesS] = line.slice(0, line.length - 1).split('{');
    let rules = rulesS.split(',');
    let fallback = rules.pop()!;
    rules = rules.map(r => r.trim());
    map[key] = {rules: rules.map(r => {
      let [comparison, target] = r.split(':')
      let key = comparison[0];
      let cmp = comparison[1];
      let n = Number(comparison.slice(2));
      return {key, cmp, n, target};
    }), fallback};
  });

  let accept = (part: Rating, name = 'in'): boolean => {
    if (name == 'R') {
      return false;
    }
    if (name == 'A') {
      return true;
    }
    let {rules, fallback} = map[name];
    for (let {key, cmp, n, target} of rules) {
      if (ops[cmp as OpsType](part[key], n)) {
        return accept(part, target);
      }
    }
    return accept(part, fallback);
  }

  return ratings.filter(part => accept(part)).map(p => Object.values(p).reduce(sum)).reduce(sum)
}

const part2 = (data: string) => {
  let [workflows, ratingsLines] = data.split('\n\n')

  let map: Record<string, Workflow> = {};
  workflows.split('\n').forEach(line => {
    let [key, rulesS] = line.slice(0, line.length - 1).split('{');
    let rules = rulesS.split(',');
    let fallback = rules.pop()!;
    rules = rules.map(r => r.trim());
    map[key] = {rules: rules.map(r => {
      let [comparison, target] = r.split(':')
      let key = comparison[0];
      let cmp = comparison[1];
      let n = Number(comparison.slice(2));
      return {key, cmp, n, target};
    }), fallback};
  });

  let count = (ranges: Record<string, number[]>, name = "in"): number => {
    if (name == 'R') {  
      return 0;
    }
    if (name == 'A') {
      let product = 1;
      for (let [low, high] of Object.values(ranges)) {
        product *= high - low + 1;
      }
      return product;
    }
    
    let {rules, fallback} = map[name];
    let total = 0;
    let comeToEnd = false;
    for (let {key, cmp, n, target} of rules) {
      let [low, high] = ranges[key];
      let trueHalf: number[];
      let falseHalf: number[];
      if (cmp == '<') {
        trueHalf = [low, n-1];
        falseHalf = [n, high];
      } else {
        trueHalf = [n+1, high];
        falseHalf = [low, n];
      }

      let found = false;
      if (trueHalf[0] <= trueHalf[1]) {
        found = true;
        total += count({...ranges, [key]: trueHalf}, target);
      }
      if (falseHalf[0] <= falseHalf[1]) {
        found = true;
        ranges = {...ranges, [key]: falseHalf};
      }
      if (!found) {
        comeToEnd = true;
        break;
      }
    }
    if (!comeToEnd) {
      total += count(ranges, fallback);
    }
    return total;
  };

  return count(Object.fromEntries("xmas".split('').map(key => [key, [1, 4000]])));
}

export const solve: Solution = (source) => {
  title("Day 19: ");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
