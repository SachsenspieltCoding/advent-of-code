import * as fs from "fs";
import { alphabet, letterToNumber } from "../../SharedFunctions";

function operateCrane(
  input: {
    input: number[][];
    actions: { count: number; from: number; to: number }[];
  },
  part2: boolean = false
): string {
  const { input: arr, actions } = input;
  for (const action of actions) {
    const { count, from, to } = action;
    const temp = arr[from].slice(arr[from].length - count);
    if (!part2) temp.reverse();
    arr[from] = arr[from].slice(0, arr[from].length - count);
    arr[to] = [...arr[to], ...temp];
  }

  let out = "";

  arr.forEach((col) => {
    out += alphabet.charAt(col[col.length - 1] - 1);
  });

  return out;
}

function getInput(): {
  input: number[][];
  actions: { count: number; from: number; to: number }[];
} {
  const out: number[][] = [];
  const actions: { count: number; from: number; to: number }[] = [];

  const matrix: { x: number; y: number; value: string }[] = [];
  const lines = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n");
  const inputLines = lines.filter((line) => line.includes("["));
  const actionLines = lines.filter((line) => line.includes("move"));

  inputLines.reverse().forEach((line, y) => {
    const lineArr = line.split("");

    for (let i = 0; i < lineArr.length; i += 4) {
      const char = lineArr[i + 1];
      if (alphabet.includes(char)) {
        matrix.push({ x: i / 4, y, value: char });
      }
    }
  });

  matrix.forEach((char) => {
    const { x, y, value } = char;
    if (out[x] === undefined) {
      out[x] = [];
    }
    out[x][y] = letterToNumber(value);
  });

  actionLines.forEach((line) => {
    const lineArr = line.split(" ");
    const count = parseInt(lineArr[1]);
    const from = parseInt(lineArr[3]);
    const to = parseInt(lineArr[5]);
    actions.push({ count, from: from - 1, to: to - 1 });
  });

  return { input: out, actions };
}

export function main() {
  // PART 1 //
  let p1 = operateCrane(getInput());
  console.log("Part 1: " + p1);

  // PART 2 //
  let p2 = operateCrane(getInput(), true);
  console.log("Part 2: " + p2);
}
