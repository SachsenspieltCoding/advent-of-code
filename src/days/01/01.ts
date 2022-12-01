import * as fs from "fs";

function getInput(): number[] {
  const out: number[] = [];
  let temp = 0;

  fs.readFileSync(__dirname + "/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
      if (line == "") {
        if (temp > 0) {
          out.push(temp);
          temp = 0;
        }
      } else {
        temp += parseInt(line);
      }
    });

  return out;
}

export function main() {
  const input = getInput();
  input.sort().reverse();

  // PART 1 //
  console.log("Part 1: " + input[0]);

  // PART 2 //
  console.log("Part 2: " + (input[0] + input[1] + input[2]));
}
