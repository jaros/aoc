
import { Solution, readInput, title, withTime } from "../../common/types";

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)

const MANDATORY_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const OPTIONAL_FIELDS = ["cid"];

const parseInput = (data: string): Record<string, string>[] => data.split("\n\n").map(passDetails => {
  let fields = passDetails.split(/\s+/);
  let keysVals = Object.fromEntries(fields.map(field => field.split(":")));
  return keysVals;
});

const hasMandatoryFields = (passport: Record<string, string>): boolean => MANDATORY_FIELDS.every(field => !!passport[field]);

let withinRange = (val: string, min: number, max: number) =>  {
  if (val?.match(/^[0-9]{4}$/)?.length != 1) {
    return false;
  }
  let num = Number(val);
  return num >= min && num <= max;
}

const allFieldsValid = (passport: Record<string, string>): boolean => {

  let hgt = passport.hgt;
  let hgtValid = hgt?.endsWith("cm")
    ? Number(hgt.split("cm")[0]) >= 150 && Number(hgt.split("cm")[0]) <= 193
    : hgt?.endsWith("in")
      ? Number(hgt.split("in")[0]) >= 59 && Number(hgt.split("in")[0]) <= 76
      : false;
  let hclValue = passport.hcl?.split("#")?.[1]
  let hclValid = hclValue?.match(/^[0-9a-f]{6}$/)?.length === 1;
  let eclValid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport.ecl);
  let pidValid = passport.pid?.match(/^[0-9]{9}$/)?.length === 1;
  return withinRange(passport.byr, 1920, 2002) &&
  withinRange(passport.iyr, 2010, 2020) &&
  withinRange(passport.eyr, 2020, 2030) &&
  hgtValid &&
  hclValid &&
  eclValid &&
  pidValid
  ;
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
