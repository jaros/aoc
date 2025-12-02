import sys

def read_input(day: str) -> str:
    source = f"2025/{day}/"
    isTest = len(sys.argv) > 1 and sys.argv[1] == "test"
    if isTest:
        source += "test.txt"
    else:
        source += "input.txt"
    with open(source, 'r') as f:
        return f.read()