
import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";


type Rating = { x: number; m: number; a: number; s: number }

const part1 = (data: string) => {
  let [workflows, ratingsLines] = data.split('\n\n')

  let ratings: Rating[] = ratingsLines.split('\n').map(line => {
    line = line.slice(1, line.length - 1);
    let rr = line.split(',').map(s => Number(s.split('=')[1]));
    return {
      x: rr[0],
      m: rr[1],
      a: rr[2],
      s: rr[3],
    }
  });

  let map: Record<string, string[]> = {};
  let acceptedParts: Rating[] = [];

  workflows.split('\n').map(line => {
    let [key, rules] = line.split('{');
    rules = rules.slice(0, rules.length - 1);
    map[key] = rules.split(',')
  });

  // console.log(map)


  for (let part of ratings) {

    let currentWorkflow = map['in'];
    console.log(currentWorkflow)
    let workFlowPos = 0;
    while (true) {
      let rule = currentWorkflow[workFlowPos];
      console.log(rule)
      if (rule == 'A') {
        acceptedParts.push(part);
        break;
      } else if (rule == 'R') {
        break;
      } else if (rule.includes('>')) {
        let [prop, cond] = rule.split('>');
        let [val, then] = cond.split(':');
        if (part[prop as keyof Rating] > Number(val)) {
          if (then == 'A') {
            acceptedParts.push(part);
            break;
          } else if (then == 'R') {
            break;
          } else {
            currentWorkflow = map[then];
            workFlowPos = 0;
          }
        } else {
          workFlowPos++;
        }
      } else if (rule.includes('<')) {
        let [prop, cond] = rule.split('<');
        let [val, then] = cond.split(':');
        if (part[prop as keyof Rating] < Number(val)) {
          if (then == 'A') {
            acceptedParts.push(part);
            break;
          } else if (then == 'R') {
            break;
          } else {
            currentWorkflow = map[then];
            workFlowPos = 0;
          }
        } else {
          workFlowPos++;
        }
      } else {
        currentWorkflow = map[rule];
        console.log(currentWorkflow, rule)

        workFlowPos = 0;
      }

    }
  }

  // console.log(acceptedParts)

  return acceptedParts.map(p => Object.values(p).reduce(sum)).reduce(sum)
}

const part2 = (data: string) => {

}

export const solve: Solution = (source) => {
  title("Day 19: ");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
