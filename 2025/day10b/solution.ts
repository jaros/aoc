
import { sum } from "../../2023/utils";
import { Solution, readInput, title, withTime } from "../../common/types";

type Machine = {
    indicatorLights: boolean[];
    buttonWiring: number[][];
    joltageRequirements: number[];
};

const getLines = (data: string) => data.split("\n")

const getMachines = (lines: string[]): Machine[] => {
    return lines.map(line => {
        const indicatorLights =
            line
                .match(/\[([.#]+)\]/)?.[1]
                ?.split("")
                .map((item) => item === "#") ?? [];
        const buttonWiring = line
            .matchAll(/\(([0-9,]+)\)/g)
            .map((item) => item[1] ?? "")
            .map((item) => item.split(",").map((element) => parseInt(element, 10)))
            .toArray();
        const joltageRequirements =
            line
                .match(/\{([0-9,]+)\}/)?.[1]
                ?.split(",")
                .map((item) => parseInt(item, 10)) ?? [];

        return {
            indicatorLights,
            buttonWiring,
            joltageRequirements,
        };
    })
}

const part1 = (data: string) => {
    return 0;
}

const solveRestrictedSystem = (
    matrix: number[][],
    target: number[],
    bounds: number[],
    numberOfColumns: number,
    numberOfRows: number,
): number => {
    const matrixCopy = matrix.map((row) => [...row]);
    const rhs = [...target];

    const pivotColumnIndices: number[] = [];

    let pivotRow = 0;
    const columnToPivotRow = new Map<number, number>();

    for (let columnIndex = 0; columnIndex < numberOfColumns && pivotRow < numberOfRows; columnIndex++) {
        let rowSelection = pivotRow;
        while (rowSelection < numberOfRows && Math.abs(matrixCopy[rowSelection]![columnIndex]!) < 1e-9) {
            rowSelection++;
        }

        if (rowSelection === numberOfRows) {
            continue;
        }

        [matrixCopy[pivotRow], matrixCopy[rowSelection]] = [matrixCopy[rowSelection]!, matrixCopy[pivotRow]!];
        [rhs[pivotRow], rhs[rowSelection]] = [rhs[rowSelection]!, rhs[pivotRow]!];

        const pivotVal = matrixCopy[pivotRow]![columnIndex]!;
        for (let j = columnIndex; j < numberOfColumns; j++) {
            matrixCopy[pivotRow]![j]! /= pivotVal;
        }
        rhs[pivotRow]! /= pivotVal;

        for (let i = 0; i < numberOfRows; i++) {
            if (i !== pivotRow) {
                const factor = matrixCopy[i]![columnIndex]!;
                if (Math.abs(factor) > 1e-9) {
                    for (let j = columnIndex; j < numberOfColumns; j++) {
                        matrixCopy[i]![j]! -= factor * matrixCopy[pivotRow]![j]!;
                    }

                    rhs[i]! -= factor * rhs[pivotRow]!;
                }
            }
        }

        pivotColumnIndices.push(columnIndex);
        columnToPivotRow.set(columnIndex, pivotRow);
        pivotRow++;
    }

    const freeVariables: number[] = [];
    const isPivot = new Set(pivotColumnIndices);

    for (let j = 0; j < numberOfColumns; j++) {
        if (!isPivot.has(j)) {
            freeVariables.push(j);
        }
    }

    for (let i = pivotRow; i < numberOfRows; i++) {
        if (Math.abs(rhs[i]!) > 1e-4) {
            return 0;
        }
    }

    let minimumPresses = Infinity;
    const currentSolution = new Array(numberOfColumns).fill(0);

    const search = (freeVarListIdx: number, currentCost: number) => {
        if (currentCost >= minimumPresses) {
            return;
        }

        if (freeVarListIdx === freeVariables.length) {
            let derivedCost = currentCost;
            let possible = true;

            for (let i = pivotColumnIndices.length - 1; i >= 0; i--) {
                const pivotColumnIndex = pivotColumnIndices[i]!;
                const pivotRowIndex = columnToPivotRow.get(pivotColumnIndex)!;

                let derivedValue = rhs[pivotRowIndex]!;

                for (let j = pivotColumnIndex + 1; j < numberOfColumns; j++) {
                    if (Math.abs(matrixCopy[pivotRowIndex]![j]!) > 1e-9) {
                        derivedValue -= matrixCopy[pivotRowIndex]![j]! * currentSolution[j]!;
                    }
                }

                if (Math.abs(derivedValue - Math.round(derivedValue)) > 1e-4) {
                    possible = false;
                    break;
                }
                derivedValue = Math.round(derivedValue);

                if (derivedValue < 0) {
                    possible = false;
                    break;
                }

                if (derivedValue > bounds[pivotColumnIndex]!) {
                    possible = false;
                    break;
                }

                currentSolution[pivotColumnIndex] = derivedValue;
                derivedCost += derivedValue;
                if (derivedCost >= minimumPresses) {
                    possible = false;
                    break;
                }
            }

            if (possible) {
                minimumPresses = derivedCost;
            }

            return;
        }

        const freeVariableIndex = freeVariables[freeVarListIdx]!;
        const freeVariableBound = bounds[freeVariableIndex]!;

        for (let val = 0; val <= freeVariableBound; val++) {
            currentSolution[freeVariableIndex] = val;
            search(freeVarListIdx + 1, currentCost + val);
        }
    };

    search(0, 0);
    return minimumPresses === Infinity ? 0 : minimumPresses;
}

const findMinimumJoltagePresses = (machine: Machine): number => {
    const numberOfCounters = machine.joltageRequirements.length;
    const numberOfButtons = machine.buttonWiring.length;

    const matrix: number[][] = Array(numberOfCounters)
        .fill(0)
        .map(() => Array(numberOfButtons).fill(0));

    const strictBounds = new Array(numberOfButtons).fill(Infinity);

    for (let j = 0; j < numberOfButtons; j++) {
        const wiring = machine.buttonWiring[j];
        if (wiring !== undefined && wiring.length > 0) {
            for (const item of wiring) {
                if (item < numberOfCounters) {
                    matrix[item]![j] = 1;
                    if (machine.joltageRequirements[item]! < strictBounds[j]!) {
                        strictBounds[j] = machine.joltageRequirements[item]!;
                    }
                }
            }
        } else {
            strictBounds[j] = 0;
        }
    }

    for (let j = 0; j < numberOfButtons; j++) {
        if (strictBounds[j] === Infinity) {
            strictBounds[j] = 0;
        }
    }

    const target = [...machine.joltageRequirements];
    return solveRestrictedSystem(matrix, target, strictBounds, numberOfButtons, numberOfCounters);
}

const part2 = (data: string) => {
    const devices = getMachines(getLines(data));
    return devices.map(d => findMinimumJoltagePresses(d)).reduce(sum);
}

export const solve: Solution = (source) => {
    title("Day 10: Factory");
    const data = readInput(source, import.meta.dir)
    withTime(part1)(data);
    withTime(part2)(data);
};
