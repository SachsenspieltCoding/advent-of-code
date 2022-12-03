import * as fs from "fs";
import { sum } from "../../SharedFunctions";

function letterToNumber(letter: string): number {
  switch (letter) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    default:
      return 0;
  }
}

function won(opponent: number, self: number): boolean {
  if (opponent == 1 && self == 2) return true;
  if (opponent == 2 && self == 3) return true;
  return opponent == 3 && self == 1;
}

function part1(input: number[]): number {
  let result = 0;
  let [opponent, self] = input;
  result += self;

  if (won(opponent, self)) {
    result += 6;
  } else if (opponent == self) {
    result += 3;
  }
  return result;
}

function part2(input: number[]): number {
  let result = 0;
  let [opponent, prediction] = input;
  let self;

  if (prediction == 1) {
    self = opponent - 1 < 1 ? 3 : opponent - 1;
  } else if (prediction == 2) {
    self = opponent;
  } else {
    self = opponent + 1 > 3 ? 1 : opponent + 1;
  }

  result += self;
  if (prediction == 2) result += 3;
  if (prediction == 3) result += 6;

  return result;
}

function getInput(): number[][] {
  const out: number[][] = [];

  fs.readFileSync(__dirname + "/input.txt", "utf8")
    .split("\n")
    .forEach((line) =>
      out.push(line.split(" ").map((item) => letterToNumber(item)))
    );

  return out;
}

export function main() {
  const input = getInput();

  // PART 1 //
  let p1 = input.map((item) => part1(item));
  console.log("Part 1: " + sum(p1));

  // PART 2 //
  let p2 = input.map((item) => part2(item));
  console.log("Part 2: " + sum(p2));
}
