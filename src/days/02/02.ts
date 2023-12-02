import { getInput } from '../../SharedFunctions'

function part1() {
  const input = getInput(__dirname)
  let sum = 0

  for (const line of input) {
    const gameId = +line.split(': ')[0].replace('Game ', '')
    const rounds = line.split(': ')[1].split('; ')
    let invalid = false
    for (const round of rounds) {
      const draws = round.split(', ')
      for (const draw of draws) {
        const red = +draw.split(' red')[0]
        const blue = +draw.split(' blue')[0]
        const green = +draw.split(' green')[0]
        if (!isNaN(red) && red > 12) invalid = true
        if (!isNaN(blue) && blue > 14) invalid = true
        if (!isNaN(green) && green > 13) invalid = true
      }
    }
    if (!invalid) sum += gameId
  }

  return sum
}

function part2() {
  const input = getInput(__dirname)
  let sum = 0

  for (const line of input) {
    const rounds = line.split(': ')[1].split('; ')
    let minRed = 0
    let minBlue = 0
    let minGreen = 0
    for (const round of rounds) {
      const draws = round.split(', ')
      for (const draw of draws) {
        const red = +draw.split(' red')[0]
        const blue = +draw.split(' blue')[0]
        const green = +draw.split(' green')[0]
        if (!isNaN(red) && red > minRed) minRed = red
        if (!isNaN(blue) && blue > minBlue) minBlue = blue
        if (!isNaN(green) && green > minGreen) minGreen = green
      }
    }
    sum += minRed * minBlue * minGreen
  }

  return sum
}

export function main() {
  // PART 1 //
  console.log('Part 1: ' + part1())

  // PART 2 //
  console.log('Part 2: ' + part2())
}
