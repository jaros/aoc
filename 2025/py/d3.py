from typing import List, Dict
from dataclasses import dataclass
from common import read_input


def get_banks(data: str) -> List[str]:
    return data.split("\n")

def findMaxBankJoltage(bank: List[str], K: int) -> int:
    remove = len(bank) - K
    stack = []
    for char in bank:
        while remove and stack and stack[-1] < char:
            stack.pop()
            remove -= 1
        stack.append(char)
    return int("".join(stack[:K]))

def findTotalMaxJoltage(banks: List[List[str]], K: int) -> int:
    total = 0
    for bank in banks:
        max_joltage = findMaxBankJoltage(bank, K)
        total += max_joltage
    return total

def part1(data: str) -> int:
    banks = get_banks(data)
    return findTotalMaxJoltage(banks, 2)

def part2(data: str) -> int:
    banks = get_banks(data)
    return findTotalMaxJoltage(banks, 12)

def solve():
    print("Day 3: Lobby")
    data = read_input("day3")
    
    result1 = part1(data)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")

if __name__ == "__main__":
    solve()