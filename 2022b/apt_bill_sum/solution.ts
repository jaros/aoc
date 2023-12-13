
import { Solution, Source, readInput} from "../../common/types";

type Bill = {
  utilities: number,
  electricity: number,
  rent: number
}

const sum = (row: string) => {
  const [date, ...parts] = row.split(';');
  const [utilities, electricity, rent] = parts.map(Number);
  const bill: Bill = {
    utilities,
    electricity,
    rent
  };
  const sum = Object.values(bill).reduce((a, b) => a + b, 0);

  const overview = Object.entries(bill).map(part => `${part[1].toFixed(2)} - ${part[0]}`).join('\n');
  const title = `bill ${date}`;
  return `\x1b[31m${title}
    \x1b[0m
${overview}
TOTAL: ${sum.toFixed(2)}
`;
}

const formatBills = (rows: string[], onlyLatest = true) => {
  if (onlyLatest) {
    return sum(rows[rows.length - 1]);
  } else {
    return rows.map(sum).join('\n\n');
  }
}

export const solve: Solution = (source) => {
  const data = readInput(source, import.meta.dir)
  console.log(formatBills(data.split('\n'), false));
};


solve(Source.INPUT)