from typing import List, Dict
from dataclasses import dataclass
from common import read_input

@dataclass
class Range:
    start: int
    end: int

def get_ranges(data: str) -> List[Range]:
    ranges = []
    for line in data.split("\n"):
        for part in line.split(","):
            if part.strip():
                a, b = part.split("-")
                ranges.append(Range(start=int(a), end=int(b)))
    return ranges

def part1(data: str) -> int:
    ranges = get_ranges(data)
    repeated = []
    
    for r in ranges:
        for i in range(r.start, r.end + 1):
            s = str(i)
            length = len(s)
            if length % 2 == 0:
                half = length // 2
                right = s[:half]
                left = s[half:]
                if right == left:
                    repeated.append(i)
    
    return sum(repeated)

def part2(data: str) -> int:
    ranges = get_ranges(data)
    repeated = []
    
    for r in ranges:
        for i in range(r.start, r.end + 1):
            s = str(i)
            length = len(s)
            half = length // 2
            l = 1
            
            while l <= half:
                if length % l == 0:
                    parts = [s[j:j+l] for j in range(0, len(s), l)]
                    first = parts[0]
                    if all(p == first for p in parts):
                        repeated.append(i)
                        break
                l += 1
    
    return sum(repeated)

def solve():
    print("Day 2: Gift Shop")
    data = read_input("day2")
    
    result1 = part1(data)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")

if __name__ == "__main__":
    solve()