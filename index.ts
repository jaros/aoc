import {solve} from "./2023/day3/solution"
import { Source } from "./common/types";

const source = process.argv[2] == 'test' ? Source.TEST : Source.INPUT;

solve(source);