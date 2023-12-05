import { readFileSync } from "fs";
import path from "path";

export type Solution = (source: Source) => void;

export enum Source {
    INPUT = "input.txt",
    TEST = "test.txt"
}

export const readInput = (source: Source, dir: string) => readFileSync(path.resolve(dir, source), "utf-8");

export const title = (header: string) => console.error(`${header}\n`)

export const withTime = <A extends any[], R>(f: (...a: A) => R) => (
    ...args: A
): R => {
    console.time(f.name)
    const value = f(...args);
    console.timeEnd(f.name)
    console.error(`answer: ${value}\n`)
    return value;
};