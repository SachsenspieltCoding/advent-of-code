export const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Sums up all the numbers in an array
 * @param input Array of numbers
 */
export function sum(input: number[]): number {
  return input.reduce((a, b) => a + b, 0);
}

/**
 * Removes duplicates from an array
 * @param input Array of numbers
 */
export function clearDuplicates(input: number[]): number[] {
  return input.filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Compares multiple arrays and returns the first value that is the same in all of them
 * @param input The arrays to compare
 */
export function findSameValue(...input: number[][]): number {
  let candidates: number[] = [...input[0]];

  while (candidates.length > 1) {
    input.forEach((rucksack) => {
      candidates.forEach((candidate) => {
        if (!rucksack.includes(candidate)) {
          candidates.splice(candidates.indexOf(candidate), 1);
        }
      });
    });
  }

  return candidates[0];
}

/**
 * Splits a string in half
 * @param input The string to split
 * @returns An object with the first and second half of the string
 */
export function halfString(input: string): { first: string; second: string } {
  const half = Math.floor(input.length / 2);
  return {
    first: input.slice(0, half),
    second: input.slice(half),
  };
}

/**
 * Converts a letter to a number by alphabet position
 * @param letter
 */
export function letterToNumber(letter: string): number {
  return alphabet.indexOf(letter) + 1;
}

/**
 * Checks if an array is contained in another array
 * @param arr The array to check
 * @param subarr The array to check for
 * @returns True if the array is contained in the other array
 */
export function containsArray(arr: number[], subarr: number[]): boolean {
  return subarr.every((v) => arr.includes(v));
}
