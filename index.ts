import express from 'express'
import { calculateBmiJson, getQueryParams } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = getQueryParams(req.query)
    const result = calculateBmiJson(height, weight)
    res.send(result)
  } catch (e) {
    const error = e.message
    res.status(404).send({ error })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
