export const min = (a: number, b: number) => Math.min(a, b);

export const sum = (a: number, b: number) => a + b;

export const multiply = (a: number, b: number) => a * b;

export const count = (line: string, char: string): number => line.split('').filter(c => c == char).length 