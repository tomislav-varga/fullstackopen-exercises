import express, { RequestHandler } from 'express';
import calculateBmi from './bmiCalculator';
const app: express.Application = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

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

app.get('/bmi', bmiHandler);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
