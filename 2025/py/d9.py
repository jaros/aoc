from typing import List, Dict
from dataclasses import dataclass
from common import read_input
from math import prod
from itertools import combinations


def part1(vertices) -> int:
    # print(vertices)
    return max((abs(x0-x1)+1)*(abs(y0-y1)+1) for (x0, y0), (x1, y1) in combinations(vertices,2))

def part2(data) -> int:
    vertices = [tuple(map(int, line.split(','))) for line in data.splitlines()]
    edges = list(zip(vertices, vertices[1:]+[vertices[0]]))
    vertical_edges = [(x0, *sorted((y0,y1))) for (x0,y0), (x1,y1) in edges if x0==x1]
    horizontal_edges = [(y0, *sorted((x0,x1))) for (x0,y0), (x1,y1) in edges if y0==y1]
    
    p2 = 0
    for (x0, y0), (x1, y1) in combinations(vertices, 2): 
        min_x, min_y, max_x, max_y = min(x0, x1)+0.5, min(y0, y1)+0.5, max(x0, x1)-0.5, max(y0, y1)-0.5
        if not any(
            (min_x<=v_x<=max_x and (min_v_y<=min_y<=max_v_y or min_v_y<=max_y<=max_v_y)) or 
            (min_y<=h_y<=max_y and (min_h_x<=min_x<=max_h_x or min_h_x<=max_x<=max_h_x))
            for (v_x, min_v_y, max_v_y), (h_y, min_h_x, max_h_x) 
            in zip(vertical_edges, horizontal_edges)
        ):
            p2 = max(p2, (abs(x0-x1)+1)*(abs(y0-y1)+1))
    return p2

def solve():
    print("Day 9:")
    data = read_input("day9")
    
    vertices = [tuple(map(int, line.split(','))) for line in data.splitlines()]
    
    result1 = part1(vertices)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")

if __name__ == "__main__":
    solve()