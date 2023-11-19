import {solve} from "./2015/day4/solution"
import { Source } from "./common/types";

const source = process.argv[2] == 'test' ? Source.TEST : Source.INPUT;

solve(source);
// e80b5017098950fc58aad83c8c14978e
// 000001dbbfa3a5c83a2d506429c7b00e