import { convertDecimalPoint, isNotNumber } from './utils'

const calculateBmi = (h: number, w: number) => {
  const bmi = w / (h / 100) ** 2
  if (bmi < 16) {
    return 'Underweight (Severe thinness)'
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)'
  } else if (bmi < 35) {
    return 'Obese (Class I)'
  } else if (bmi < 40) {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}

const getArgs = (): { h: number; w: number } => {
  const args = process.argv

  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not all numbers!')
  }

  return {
    h: Number(args[2]),
    w: Number(args[3]),
  }
}

try {
  const { h, w } = getArgs()
  const res = calculateBmi(h, w)
  console.log(
    `Height: ${convertDecimalPoint(h)} cm\n
    Weight: ${convertDecimalPoint(w)} kg\n
    BMI: ${res}`
  )
} catch (e: unknown) {
  let message = 'Calculation failed!'
  if (e instanceof Error) {
    message += '\nError: ' + e.message
  }
  message += '\nUsage: npm run calculateBmi <height in cm> <weight in kg>'
  message += '\nExample command: npm run calculateBmi 175 82.6'
  console.log(message)
}
