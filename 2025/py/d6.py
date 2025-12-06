from typing import List, Dict
from dataclasses import dataclass
from common import read_input
from math import prod

@dataclass
class Problem:
    args: dict[int, str]
    operation: str

def get_problems(data: str, vertical: bool = False) -> List[Problem]:
    lines = data.splitlines()
    ops = lines[-1]
    problems: dict[int, Problem] = {}
    for idx, ch in enumerate(ops):
        if ch in "+*":
            problems[idx] = Problem(args = {}, operation=ch)
    for row_idx, line in enumerate(lines[:-1]):
        last_op_idx = -1
        for col_idx, ch in enumerate(line):
            if col_idx in problems:
                last_op_idx = col_idx
            if ch != " " and last_op_idx != -1:
                key_idx = row_idx if not vertical else col_idx
                args = problems[last_op_idx].args
                args[key_idx] = args.get(key_idx, "") + ch
    # print(problems)            
    return list(problems.values())

def calculate(problems: List[Problem]) -> int:
    total = 0
    for problem in problems:
        values = (int(arg) for arg in problem.args.values())
        if problem.operation == "+":
            total += sum(values) 
        elif problem.operation == "*":
            total += prod(values)
    return total

def part1(data: str) -> int:
    problems = get_problems(data)
    return calculate(problems)

def part2(data: str) -> int:
    problems = get_problems(data, vertical=True)
    return calculate(problems)

def solve():
    print("Day 6: Trash Compactor")
    data = read_input("day6")
    
    result1 = part1(data)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")

if __name__ == "__main__":
    solve()