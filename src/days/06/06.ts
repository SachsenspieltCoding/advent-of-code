import * as fs from "fs";
import { clearDuplicates, letterToNumber } from "../../SharedFunctions";

function getMarker(input: number[], length: number): number {
  let out = 0;
  for (let i = 0; i < input.length; i++) {
    if (clearDuplicates(input.slice(i, i + length)).length === length) {
      out = i + length;
      break;
    }
  }
  return out;
}

function getInput(): number[] {
  const out: number[] = [];

  fs.readFileSync(__dirname + "/input.txt", "utf8")
    .split("")
    .forEach((char) => {
      out.push(letterToNumber(char));
    });

  return out;
}

export function main() {
  const input = getInput();

  // PART 1 //
  console.log("Part 1: " + getMarker(input, 4));

  // PART 2 //
  console.log("Part 2: " + getMarker(input, 14));
}
