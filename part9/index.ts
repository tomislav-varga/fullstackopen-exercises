import express, { RequestHandler } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app: express.Application = express();
app.use(express.json());
const bmiHandler: RequestHandler = (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi
  });
};

const exerciseHandler: RequestHandler = (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0
  || typeof target !== 'number' || 
      !daily_exercises.every(item => typeof item === 'number')) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: "malformatted parameters", message: error.message });
    } else {
      res.status(400).json({ error: "malformatted parameters" });
    }
  }
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', bmiHandler);

app.post('/exercises', exerciseHandler);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
