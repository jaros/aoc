import { readFileSync } from "fs";
import path from "path";

export type Solution = (source: Source) => void;

export enum Source {
    INPUT = "input.txt",
    TEST = "test.txt"
}

export const readInput = (source: Source, dir: string) => readFileSync(path.resolve(dir, source), "utf-8");

export const title = (header: string) =>
    console.log(`
\x1b[32m${new Date().toISOString()}
\x1b[31m${header}
\x1b[0m`);

export const withTime = <A extends any[], R>(f: (...a: A) => R) => (
    ...args: A
): R => {
    console.log(f.name);
    let start = new Date().getTime();
    const value = f(...args);
    console.log(`spent time: ${new Date().getTime() - start} ms`)
    return value;
};