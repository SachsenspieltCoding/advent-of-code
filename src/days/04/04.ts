import * as fs from "fs";
import { containsArray, sum } from "../../SharedFunctions";

function part1(input: number[][]): number {
  const [first, second] = input;
  return containsArray(second, first) || containsArray(first, second) ? 1 : 0;
}

function part2(input: number[][]): number {
  const [first, second] = input;
  const firstInSecond = second.filter((num) => first.includes(num));
  const secondInFirst = first.filter((num) => second.includes(num));
  return firstInSecond.length > 0 || secondInFirst.length > 0 ? 1 : 0;
}

function getInput(): number[][][] {
  const out: number[][][] = [];

  let temp: number[][] = [];

  fs.readFileSync(__dirname + "/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
      line.split(",").forEach((half) => {
        const [first, second] = half.split("-");
        console.log(first, second);
        const arr = [];
        for (let i = parseInt(first); i <= parseInt(second); i++) {
          arr.push(i);
        }
        temp.push(arr);
      });
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
  let p2 = input.map((i) => part2(i));
  console.log("Part 2: " + sum(p2));
}
