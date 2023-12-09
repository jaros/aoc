import { Source } from "./common/types";

const day = parseInt(process.argv[2]!, 10);
if (Number.isNaN(day)) {
    throw new Error('Invalid error')
}

const module = `./2016/day${day}/solution`;
const { solve } = await import(module)

const source = process.argv[3] == 'test' ? Source.TEST : Source.INPUT;

solve(source);