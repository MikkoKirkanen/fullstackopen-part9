import express from 'express';
import { calculateBmiJson } from './bmiCalculator';
import { ExerciseRequest } from './models/exercise';
import { calculateExercisesJson } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const result = calculateBmiJson(Number(height), Number(weight));
    res.send(result);
  } catch (e) {
    let error = '';
    if (e instanceof Error) {
      error = e.message;
    }
    res.status(404).send({ error });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequest;

  if (!daily_exercises || !target) {
    const error = 'Parameters missing';
    res.send({ error });
    return;
  }
  if (daily_exercises.some((de) => isNaN(de)) || isNaN(target)) {
    const error = 'Malformatted parameters';
    res.send({ error });
    return;
  }

  const result = calculateExercisesJson(target, daily_exercises);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
