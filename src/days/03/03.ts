import { log } from 'console'
import { clearDuplicates, getInput, sum } from '../../SharedFunctions'

function parseInputTo2DArray() {
  const input = getInput(__dirname)

  const inputMap: {
    value: string | number
    isPoint: boolean
    isNumber: boolean
    charNearby: boolean
    gears: {
      x: number
      y: number
    }[]
  }[][] = []

  // Map input to 2D array
  function parseChar(char: string) {
    if (!isNaN(+char)) return +char
    return char
  }

  for (let y = 0; y < input.length; y++) {
    const chars = input[y].split('')
    for (let x = 0; x < chars.length; x++) {
      if (!inputMap[y]) inputMap[y] = []
      inputMap[y][x] = {
        value: parseChar(chars[x]),
        isPoint: chars[x] === '.',
        isNumber: !isNaN(+chars[x]),
        charNearby: false,
        gears: [],
      }
    }
  }

  return inputMap
}

function part1() {
  const inputMap = parseInputTo2DArray()

  // Check if any entry close to the coordinate is a char (not a number nor a point)
  function checkCharNearby(x: number, y: number) {
    const nearbyCoords = [
      // Upper row
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],

      // Middle row
      [x - 1, y],
      [x + 1, y],

      // Lower row
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
    ]

    for (const coord of nearbyCoords) {
      if (inputMap[coord[1]] && inputMap[coord[1]][coord[0]]) {
        if (
          !inputMap[coord[1]][coord[0]].isNumber &&
          !inputMap[coord[1]][coord[0]].isPoint
        ) {
          inputMap[y][x].charNearby = true
          break
        }
      }
    }
  }

  inputMap.forEach((row, y) => {
    row.forEach((entry, x) => {
      if (entry.isNumber) {
        checkCharNearby(x, y)
      }
    })
  })

  // Build all numbers together
  let numbers: { value: number; charNearby: boolean }[] = []
  for (const row of inputMap) {
    let cacheString = ''
    let cacheBool = false

    for (const entry of row) {
      if (entry.isNumber) {
        cacheString += entry.value
        if (!cacheBool && entry.charNearby) cacheBool = true
      } else {
        if (cacheString.length > 0) {
          numbers.push({
            value: +cacheString,
            charNearby: cacheBool,
          })
          cacheString = ''
          cacheBool = false
        }
      }
    }

    if (cacheString.length > 0) {
      numbers.push({
        value: +cacheString,
        charNearby: cacheBool,
      })
      cacheString = ''
      cacheBool = false
    }
  }

  // Only keep numbers with a char nearby
  numbers = numbers.filter((num) => num.charNearby)

  return sum(numbers.map((num) => num.value))
}

// function part2() {
//   const input = getInput(__dirname)

//   const inputMap: {
//     value: string | number
//     isGear: boolean
//     isNumber: boolean
//   }[][] = []

//   // Map input to 2D array
//   function parseChar(char: string) {
//     if (!isNaN(+char)) return +char
//     return char
//   }

//   for (let y = 0; y < input.length; y++) {
//     const chars = input[y].split('')
//     for (let x = 0; x < chars.length; x++) {
//       if (!inputMap[y]) inputMap[y] = []
//       inputMap[y][x] = {
//         value: parseChar(chars[x]),
//         isGear: chars[x] === '*',
//         isNumber: !isNaN(+chars[x]),
//       }
//     }
//   }

//   let gears: {
//     x: number
//     y: number
//     hits: { x: number; y: number }[]
//     numbers: number[]
//   }[] = []

//   function checkForHits(x: number, y: number) {
//     const hits: {
//       x: number
//       y: number
//     }[] = []

//     const nearbyCoords = [
//       // Upper row
//       [x - 1, y + 1],
//       [x, y + 1],
//       [x + 1, y + 1],

//       // Middle row
//       [x - 1, y],
//       [x + 1, y],

//       // Lower row
//       [x - 1, y - 1],
//       [x, y - 1],
//       [x + 1, y - 1],
//     ]

//     for (const coord of nearbyCoords) {
//       if (inputMap[coord[1]] && inputMap[coord[1]][coord[0]]) {
//         if (inputMap[coord[1]][coord[0]].isNumber) {
//           hits.push({
//             x: coord[0],
//             y: coord[1],
//           })
//         }
//       }
//     }

//     return hits
//   }

//   inputMap.forEach((row, y) => {
//     row.forEach((entry, x) => {
//       if (entry.isGear) {
//         gears.push({
//           x,
//           y,
//           hits: checkForHits(x, y),
//           numbers: [],
//         })
//       }
//     })
//   })

//   gears.filter((gear) => gear.hits.length > 1)

//   // Gets the entire number based on a hit by checking the nearby numbers in a row (x coord)
//   // A number is max 3 chars long, so it can be 1, 2 or 3 chars long
//   // Take into account that a hit can be in the middle, on the left or right of the number (important for 2 and 3 char numbers)
//   // When iterating over the inputMap, always check that the entry exists (not undefined)
//   // In a row, there are multiple numbers seperated by points, so we need to check for points as well and only use the number with the hit in it
//   function getFullNumber(x: number, y: number) {
//     let number = ''

//     if (!inputMap[y][x] || !inputMap[y][x].isNumber) return 0

//     // Check left
//     let leftX = x - 1
//     while (inputMap[y][leftX]) {
//       if (inputMap[y][leftX].isNumber) {
//         number = inputMap[y][leftX].value + number
//       } else if (inputMap[y][leftX].value === '.') {
//         break
//       }
//       leftX--
//     }

//     // Check middle
//     number += inputMap[y][x].value

//     // Check right
//     let rightX = x + 1
//     while (inputMap[y][rightX]) {
//       if (inputMap[y][rightX].isNumber) {
//         number += inputMap[y][rightX].value
//       } else if (inputMap[y][rightX].value === '.') {
//         break
//       }
//       rightX++
//     }

//     return +number
//   }

//   // Hit validation
//   // Clear hits that are next to each other in the same row
//   gears = gears.map((gear) => {
//     const hits: {
//       x: number
//       y: number
//     }[] = []

//     gear.hits.forEach((hit) => {
//       if (
//         !hits.some(
//           (h) => (h.x === hit.x - 1 || h.x === hit.x + 1) && h.y === hit.y
//         )
//       ) {
//         hits.push(hit)
//       }
//     })

//     console.log(hits)

//     gear.hits = hits
//     return gear
//   })

//   gears = gears.map((gear) => {
//     gear.hits.forEach((hit) => {
//       gear.numbers.push(getFullNumber(hit.x, hit.y))
//     })
//     return gear
//   })

//   gears = gears.filter((gear) => gear.numbers.length == 2)

//   return sum(gears.flatMap((gear) => gear.numbers.reduce((a, b) => a * b, 1)))
// }

function part2() {
  const inputMap = parseInputTo2DArray()

  function checkGearsNearby(x: number, y: number) {
    const nearbyCoords = [
      // Upper row
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],

      // Middle row
      [x - 1, y],
      [x + 1, y],

      // Lower row
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
    ]

    for (const coord of nearbyCoords) {
      if (inputMap[coord[1]] && inputMap[coord[1]][coord[0]]) {
        if (inputMap[coord[1]][coord[0]].value === '*') {
          inputMap[y][x].gears.push({
            x: coord[0],
            y: coord[1],
          })
        }
      }
    }
  }

  inputMap.forEach((row, y) => {
    row.forEach((entry, x) => {
      if (entry.isNumber) {
        checkGearsNearby(x, y)
      }
    })
  })

  // Build all numbers together
  let gears = new Map<string, number[]>()

  function clearDupicateGears(gears: { x: number; y: number }[]) {
    const newGears: { x: number; y: number }[] = []

    for (const gear of gears) {
      if (!newGears.some((g) => g.x === gear.x && g.y === gear.y)) {
        newGears.push(gear)
      }
    }

    return newGears
  }

  for (const row of inputMap) {
    let cacheString = ''
    let cacheGears: {
      x: number
      y: number
    }[] = []

    for (const entry of row) {
      if (entry.isNumber) {
        cacheString += entry.value
        cacheGears = cacheGears.concat(entry.gears)
      } else {
        if (cacheString.length > 0) {
          cacheGears = clearDupicateGears(cacheGears)
          cacheGears.forEach((gear) => {
            if (gears.has(gear.x + ',' + gear.y)) {
              gears.set(
                gear.x + ',' + gear.y,
                gears.get(gear.x + ',' + gear.y).concat(+cacheString)
              )
            } else {
              gears.set(gear.x + ',' + gear.y, [+cacheString])
            }
          })
          cacheString = ''
          cacheGears = []
        }
      }
    }

    if (cacheString.length > 0) {
      cacheGears = clearDupicateGears(cacheGears)
      cacheGears.forEach((gear) => {
        if (gears.has(gear.x + ',' + gear.y)) {
          gears.set(
            gear.x + ',' + gear.y,
            gears.get(gear.x + ',' + gear.y).concat(+cacheString)
          )
        } else {
          gears.set(gear.x + ',' + gear.y, [+cacheString])
        }
      })
      cacheString = ''
      cacheGears = []
    }
  }

  // Filter out gears where there are not exact 2 numbers
  const filteredGears = new Map<string, number[]>()
  for (const [key, value] of gears) {
    if (value.length === 2) {
      filteredGears.set(key, value)
    }
  }

  let sum = 0

  for (const [key, value] of filteredGears) {
    sum += value.reduce((a, b) => a * b, 1)
  }

  return sum
}

export function main() {
  // PART 1 //
  console.log('Part 1: ' + part1())

  // PART 2 //
  console.log('Part 2: ' + part2())
}
