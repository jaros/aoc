from common import read_input

def get_lines(data: str) -> list[str]:
    return data.strip().split("\n")


def part1(data: str) -> int:
    lines = get_lines(data)
    
    current = 50
    zeros = 0
    
    for line in lines:
        times = int(line[1:])
        d = line[0]
        
        if d == "R":
            current = (current + times) % 100
        else:
            current = (current - times + 100) % 100
        
        if current == 0:
            zeros += 1
    
    return zeros


def part2(data: str) -> int:
    lines = get_lines(data)
    
    current = 50
    zeros = 0
    
    for line in lines:
        times = int(line[1:])
        d = line[0]
        
        if d == "R":
            next_pos = current + times
            zeros += next_pos // 100
            current = next_pos % 100
        else:
            next_pos = current - times
            if next_pos <= 0:
                zeros += next_pos // -100
                if current != 0:  # crossed the zero, 0 to -5 is not counted
                    zeros += 1
            current = ((next_pos % 100) + 100) % 100
    
    return zeros


def solve() -> None:
    print("Day 1: Secret Entrance")
    data = read_input("day1")
    
    result1 = part1(data)
    print(f"Part 1: {result1}")
    
    result2 = part2(data)
    print(f"Part 2: {result2}")


if __name__ == "__main__":
    solve()