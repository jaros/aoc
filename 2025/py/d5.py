from typing import List, Dict
from dataclasses import dataclass
from common import read_input

@dataclass
class Range:
    start: int
    end: int

def get_ranges(data: str) -> List[str]:
    fresh_ingr_id_ranges, available_ids_str = data.split("\n\n", 1)
    ranges = [
        Range(start=int(start), end=int(end))
        for start, end in (
            line.split("-") for line in fresh_ingr_id_ranges.splitlines()
        )
    ]
    available_ids = [int(line) for line in available_ids_str.splitlines()]
    return ranges, available_ids

def part1(data: str) -> int:
    ranges, available_ids = get_ranges(data)
    return sum(
        any(r.start <= ingr_id <= r.end for r in ranges)
        for ingr_id in available_ids
    )

def part2(data: str) -> int:
    ranges = get_ranges(data)[0]
    merged = []
    sorted_ranges = sorted(ranges, key=lambda r: r.start)
    
    current = Range(sorted_ranges[0].start, sorted_ranges[0].end)   # make a copy
    for r in sorted_ranges[1:]:
        # merge only overlapping (not just touching) ranges
        if current.end >= r.start:
            current.end = max(current.end, r.end)
        else:
            merged.append(current)
            current = Range(r.start, r.end)  # copy to avoid mutation by reference in merged result
    merged.append(current)
    
    return sum(r.end - r.start + 1 for r in merged)

def solve():
    print("Day 5: Cafeteria")
    data = read_input("day5")
    
    result1 = part1(data)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")

if __name__ == "__main__":
    solve()