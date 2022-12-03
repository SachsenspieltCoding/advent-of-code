import * as fs from "fs";
import {
  clearDuplicates,
  findSameValue,
  halfString,
  letterToNumber,
  sum,
} from "../../SharedFunctions";

function part1(input: number[][]): number {
  return findSameValue(
    clearDuplicates(input[0].flat()),
    clearDuplicates(input[1].flat())
  );
}

function part2(input: number[][][]): number[] {
  const groups: number[][][][] = [];
  let i = 0;
  input.forEach((rucksack) => {
    if (!groups[i]) groups[i] = [];
    groups[i].push(rucksack);
    if (groups[i].length === 3) {
      i++;
    }
  });

  const out: number[] = [];

  groups.forEach((group) => {
    out.push(
      findSameValue(
        clearDuplicates(group[0].flat()),
        clearDuplicates(group[1].flat()),
        clearDuplicates(group[2].flat())
      )
    );
  });

  return out;
}

function getInput(): number[][][] {
  const out: number[][][] = [];

  let temp: number[][] = [];

  fs.readFileSync(__dirname + "/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
      const { first, second } = halfString(line);
      temp.push(first.split("").map((l) => letterToNumber(l)));
      temp.push(second.split("").map((l) => letterToNumber(l)));
      out.push(temp);
      temp = [];
    });

  return out;
}

export function main() {
  const input = getInput();

  // PART 1 //
  let p1 = input.map((i) => part1(i));
  console.log("Part 1: " + sum(p1));

  // PART 2 //
  let p2 = part2(input);
  console.log("Part 2: " + sum(p2));
}
