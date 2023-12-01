
import { Solution, readInput, title, withTime } from "../../common/types";

type File = {
  name: string;
  size: number;
}

type Dir = {
  name: string;
  parent: Dir | null;
  size: number;
  files: File[];
  dirs: Dir[];
}

const buildDirTree = (data: string): Dir => {
  let rows = data.split('\n');
  let isListing = false;

  let parent: Dir = {
    name: "/",
    dirs: [],
    files: [],
    parent: null,
    size: 0
  };

  let currentDir: Dir | null = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let [c1, c2, c3] = row.split(" ");
    if (c1 == "$") { // command
      isListing = false;
      if (c2 == "cd") { // goto
        if (c3 == "..") {
          currentDir = currentDir!.parent;
        } else if (c3 == '/') {
          currentDir = parent;
        } else {
          currentDir = currentDir!.dirs.find(d => d.name == c3)!;
        }
      } else if (c2 == "ls") {
        isListing = true;
      }
    } else if (isListing) {
      if (c1 == "dir") {
        currentDir!.dirs.push({
          name: c2,
          dirs: [],
          files: [],
          parent: currentDir,
          size: 0
        });
      } else {
        currentDir!.files.push({ size: Number(c1), name: c2 });
      }
    }
  }

  let calculateDirSize = (dir: Dir): number => {
    dir.size = dir.files.reduce((a, b) => a + b.size, 0) + dir.dirs.map(calculateDirSize).reduce((a, b) => a + b, 0);
    return dir.size;
  }
  calculateDirSize(parent);
  return parent;
}

const part1 = (data: string) => {
  const parent = buildDirTree(data);
  const atMost = 100000;

  let findSumMinDirs = (dir: Dir): number =>
    (dir.size <= atMost ? dir.size : 0) + dir.dirs.map(findSumMinDirs).reduce((a, b) => a + b, 0);

  return findSumMinDirs(parent);
};

const part2 = (data: string) => {
  const parent = buildDirTree(data);
  const totalDisk = 70000000;
  const minFreeSpace = 30000000;
  const avaialableFreeSpace = totalDisk - parent.size;
  if (avaialableFreeSpace >= minFreeSpace) {
    return 0;
  }
  const toBeMinDeleted = minFreeSpace - avaialableFreeSpace;
  let findMinDir = (current: Dir): number => {
    if (current.size >= toBeMinDeleted) {
      return Math.min(current.size, ...current.dirs.map(findMinDir));
    }
    return Number.MAX_VALUE;
  }

  return findMinDir(parent);
};

export const solve: Solution = (source) => {
  title("Day 7: No Space Left On Device");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
