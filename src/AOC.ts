import { readdirSync } from 'fs'

const prompt = require('prompt-sync')()

const days: {
  day: string
  dir: string
}[] = []

readdirSync(__dirname + '/days').forEach((dir) => {
  readdirSync(__dirname + '/days/' + dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      const day = file.split('.')[0]
      days.push({ day, dir })
    }
  })
})

console.log('=== AOC2023 ===')
console.log('Days:', days.length)
console.log('Days:', days.map((d) => d.day).join(', '))
console.log('=== AOC2023 ===')

const day = parseInt(prompt('Day: ') || '0')

if (day > 0 && day <= days.length) {
  const { dir, day: d } = days[day - 1]
  const { main } = require(`./days/${dir}/${d}`)
  if (typeof main === 'function') {
    main()
  } else {
    console.log('No main function found.')
  }
}
