import { Solution, readInput, title, withTime } from "../../common/types";

const parseInput = (data: string) => {
  let lines = data.split("\n");
  return lines;
};

const checkSum = (memBlocks: number[]) => {
  let sum = 0;
  for (let i = 0; i < memBlocks.length; i++) {
    if (memBlocks[i] != -1) {
      sum += memBlocks[i] * i;
    }
  }

  return sum;
}

const part1 = (data: string) => {
  const diskMap = data;
  // console.log(diskMap);

  let memBlocks = [];
  let memBlockId = 0;
  // let freeMems = [];
  let freeCounter = 0;
  for (let i = 0; i < diskMap.length; i++) {
    let block = Number(diskMap[i]);
    for (let j = 0; j < block; j++) {
      if (i % 2 == 0) {
        // mem
        memBlocks.push(memBlockId);
      } else {
        memBlocks.push(-1);
        freeCounter++;
      }
    }
    if (i % 2 == 0) {
      memBlockId++
    }
    
  }

  console.log("freeCounter", freeCounter);

  let l = 0;
  let r = memBlocks.length - 1;

  // console.log(memBlocks);

  while (freeCounter > 0 && l < r) {
    // swap
    while (memBlocks[l] != -1) {
      l++;
    } // looking left to shift
    if (l >= r) {
      break
    }
    while (memBlocks[r] == -1) {
      r--;
    } // looking right to shift
    if (l >= r) {
      break
    }

    let tmp: number = memBlocks[l];
    memBlocks[l] = memBlocks[r];
    memBlocks[r] = tmp;
    // console.log(memBlocks);
    freeCounter--;
  }

  // console.log(memBlocks);

  // do math
  return checkSum(memBlocks);
};

type MemBlock = {
  startIdx: number;
  blockLen: number;
  memBlockId: number;
}

const part2 = (data: string) => {
  const diskMap = data;

  let memBlocks = [];
  let memBlockId = -1;
  let freeBlockLengths: MemBlock[] = [];
  let memBlocksLengths: MemBlock[] = []; 

  for (let i = 0; i < diskMap.length; i++) {
    let blockLen = Number(diskMap[i]);
    let startIdx = memBlocks.length;
    if (i % 2 == 0) {
      memBlockId++;
      memBlocksLengths.push({startIdx, blockLen, memBlockId});
    } else {
      freeBlockLengths.push({startIdx, blockLen, memBlockId: -1})
    }
    for (let j = 0; j < blockLen; j++) {
      if (i % 2 == 0) {
        // mem
        memBlocks.push(memBlockId);
      } else {
        memBlocks.push(-1);
      }
    }
    
  }
  memBlocksLengths.reverse(); // to start with biggest ID.

  const findFreeMemBlockStart = (neededMemLen: number, maxIndex: number): number | undefined => {
    for (let block of freeBlockLengths) {
      if (block.startIdx >= maxIndex) {
        return undefined;
      }
      if (block.blockLen >= neededMemLen) {
        const starIdx = block.startIdx;
        block.blockLen -= neededMemLen;
        block.startIdx += neededMemLen;
        return starIdx;
      }
    }
    return undefined;
  }

  for (let memBlock of memBlocksLengths) {
    let neededLen = memBlock.blockLen;
    let startIdx = findFreeMemBlockStart(neededLen, memBlock.startIdx);
    if (startIdx === undefined) {
      continue;
    }
    // swap
    for (let i = 0; i < neededLen; i++) {
      let l = startIdx + i;
      let r = memBlock.startIdx + i;
      let tmp: number = memBlocks[l];
      memBlocks[l] = memBlocks[r];
      memBlocks[r] = tmp;
    }
  }

  // do math
  return checkSum(memBlocks);
};

export const solve: Solution = (source) => {
  title("Day 9: Disk Fragmenter");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
