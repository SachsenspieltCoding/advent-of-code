import { getInput } from '../../SharedFunctions'

function part1() {
  const input = getInput(__dirname)
  const numbers = input.map((n) => n.split('').filter((m) => !isNaN(+m)))
  const calibrations = numbers.map((n) => n[0] + n[n.length - 1])
  let sum = 0
  calibrations.forEach((c) => {
    if (!isNaN(parseInt(c))) sum += parseInt(c)
  })
  return sum
}

function part2() {
  let sum = 0
  const input = getInput(__dirname)

  const map = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  for (let line of input) {
    const numbers: number[] = []
    for (let i = 0; i < line.split('').length; i++) {
      const char = line.split('')[i]
      if (!isNaN(+char)) {
        numbers.push(+char)
        continue
      }

      for (let key in map) {
        if (line.slice(i).startsWith(key)) numbers.push(+map[key])
      }
    }

    sum += +(numbers[0].toString() + numbers[numbers.length - 1].toString())
  }
  return sum
}

export function main() {
  // PART 1 //
  console.log('Part 1: ' + part1())

  // PART 2 //
  console.log('Part 2: ' + part2())
}
