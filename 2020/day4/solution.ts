
import { Solution, readInput, title, withTime } from "../../common/types";

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)

type Passport = Record<string, string>;

const parseInput = (data: string): Passport[] => data.split("\n\n").map(passDetails => {
  let fields = passDetails.split(/\s+/);
  let keysVals = Object.fromEntries(fields.map(field => field.split(":")));
  return keysVals;
});

const hasMandatoryFields = (passport: Passport): boolean => Object.keys(passValidators).every(field => !!passport[field]);

let withinRange = (min: number, max: number) => (val: string) =>  {
  if (val?.match(/^[0-9]{4}$/)?.length != 1) {
    return false;
  }
  let num = Number(val);
  return num >= min && num <= max;
}

const eclValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const passValidators: Record<string, (val: string) => boolean> = {
  byr: withinRange(1920, 2002),
  iyr: withinRange(2010, 2020),
  eyr: withinRange(2020, 2030),
  hgt: val => {
    if (val?.endsWith("cm")) {
      let num = Number(val.split("cm")[0]);
      return num >= 150 && num <= 193
    }
    if (val?.endsWith("in")) {
      let num = Number(val.split("in")[0]);
      return num >= 59 && num <= 76
    }
    return false;
  },
  hcl: val => val?.match(/^#[0-9a-f]{6}$/)?.length === 1,
  ecl: val => eclValues.includes(val),
  pid: val => val?.match(/^[0-9]{9}$/)?.length === 1,
}

const allFieldsValid = (passport: Passport): boolean => {
  return Object.entries(passValidators).every(([key, validate]) => validate(passport[key])); 
};

const part1 = (data: string) => {
  let passports = parseInput(data);
  return passports.filter(hasMandatoryFields).length;
};

const part2 = (data: string) => {
  let passports = parseInput(data);
  return passports.filter(allFieldsValid).length;
};

export const solve: Solution = (source) => {
  title("Day 4: Passport Processing");
  const data = readInput(source, import.meta.dir)
  withTime(part1)(data);
  withTime(part2)(data);
};
