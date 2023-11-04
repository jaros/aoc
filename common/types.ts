import { readFileSync } from "fs";
import path from "path";

export type Solution = (part: "part_1" | "part_2", source: Source) => void;

export enum Source {
    INPUT = "input.txt",
    TEST = "test.txt"
}

export const readInput = (source: Source, dir: string) => readFileSync(path.resolve(dir, source), "utf-8");

export const title = (header: string) =>
    console.log(`
${new Date().toISOString()}
${header}
`);

export const withTime = <A extends any[], R>(f: (...a: A) => R) => (
    ...args: A
): R => {
    let start = new Date().getTime();
    const value = f(...args);
    console.log(`spent time: ${new Date().getTime() - start} ms`)
    return value;
};