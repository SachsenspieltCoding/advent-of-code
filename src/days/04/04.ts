import { log } from 'console'
import { getInput } from '../../SharedFunctions'

function part1() {
  const input = getInput(__dirname)
  let sum = 0

  function parseNumberString(numberString: string) {
    return numberString
      .split(' ')
      .map((number) => +number)
      .filter((number) => !isNaN(number) && number !== 0)
  }

  for (const scratchcard of input) {
    const [winningNumbersString, myNumbersString] = scratchcard
      .split(': ')[1]
      .split(' | ')

    const winnigNumbers = parseNumberString(winningNumbersString)
    const myNumbers = parseNumberString(myNumbersString)

    let matches = winnigNumbers.filter((number) =>
      myNumbers.includes(number)
    ).length

    if (matches < 1) continue

    if (matches == 1) sum++
    else sum += Math.pow(2, matches - 1)
  }

  return sum
}

function part2() {
  const input = getInput(__dirname)
  let sum = 0
  const cards = new Map<number, number>()

  function parseNumberString(numberString: string) {
    return numberString
      .split(' ')
      .map((number) => +number)
      .filter((number) => !isNaN(number) && number !== 0)
  }

  for (const scratchcard of input) {
    const [winningNumbersString, myNumbersString] = scratchcard
      .split(': ')[1]
      .split(' | ')

    const game = +scratchcard
      .split(':')[0]
      .replaceAll('Card ', '')
      .replaceAll(' ', '')
    const winnigNumbers = parseNumberString(winningNumbersString)
    const myNumbers = parseNumberString(myNumbersString)

    let matches = winnigNumbers.filter((number) =>
      myNumbers.includes(number)
    ).length

    if (!cards.has(game)) cards.set(game, 1)
    else cards.set(game, cards.get(game) + 1)

    for (let i = 1; i < matches + 1; i++) {
      console.log(
        `game: ${game}, i: ${i}, matches: ${matches}, game + i: ${game + i}`
      )

      if (!cards.has(i + game)) cards.set(i + game, 0)
      cards.set(i + game, cards.get(i + game) + cards.get(game))
    }
  }

  for (const value of cards.values()) {
    sum += value
  }

  return sum
}

export function main() {
  // PART 1 //
  console.log('Part 1: ' + part1())

  // PART 2 //
  console.log('Part 2: ' + part2())
}
