import { Solution, readInput, title, withTime } from "../../common/types";
import { sum } from "../utils";

enum State {
  ON = "on",
  OFF = "off",
}

enum Pulse {
  HI = "hi",
  LO = "lo",
}
class Module {
  public state: State = State.OFF;
  public memory: Record<string, Pulse> = {};
  constructor(
    public name: string,
    public type: string,
    public outputs: string[]
  ) {}
}

const part1 = (data: string) => {
  let modules: Record<string, Module> = {};

  let broadcastTargets: string[] = [];

  for (let line of data.split("\n")) {
    let [name, sendersS] = line.split(" -> ");
    let senders = sendersS.split(", ");
    if (name == "broadcaster") {
      broadcastTargets = senders;
    } else {
      let type = name[0];
      name = name.slice(1);
      modules[name] = new Module(name, type, senders);
    }
  }

  for (let name of Object.keys(modules)) {
    let module = modules[name];
    for (let output of module.outputs) {
      if (modules[output] && modules[output].type == "&") {
        modules[output].memory[name] = Pulse.LO;
      }
    }
  }

  let lo = 0;
  let hi = 0;

  type Item = {
    origin: string;
    target: string;
    pulse: Pulse;
  };

  for (let i = 0; i < 1000; i++) {
    lo += 1;
    let init: Item[] = broadcastTargets.map((target: string) => ({
      origin: "broadcaster",
      target,
      pulse: Pulse.LO,
    }));
    let q = [...init];
    while (q.length != 0) {
      let { origin, target, pulse } = q.shift()!;
      if (pulse == Pulse.LO) {
        lo += 1;
      } else {
        hi += 1;
      }

      if (!modules[target]) {
        continue;
      }

      let module = modules[target];

      if (module.type == "%") {
        if (pulse == Pulse.LO) {
          module.state = module.state == State.ON ? State.OFF : State.ON;
          let outgoing = module.state == State.ON ? Pulse.HI : Pulse.LO;
          for (let x of module.outputs) {
            q.push({ origin: module.name, target: x, pulse: outgoing });
          }
        }
      } else {
        module.memory[origin] = pulse;
        let outgoing = Object.values(module.memory).every(p => p == Pulse.HI) ? Pulse.LO : Pulse.HI;
        for (let x of module.outputs) {
          q.push({ origin: module.name, target: x, pulse: outgoing });
        }
      }
    }
  }

  return lo * hi;
};

const part2 = (data: string) => {
  return 0;
};

export const solve: Solution = (source) => {
  title("Day 20: Pulse Propagation");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
