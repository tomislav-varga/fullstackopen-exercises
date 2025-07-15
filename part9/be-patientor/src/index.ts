import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patientRoutes';
const app = express();


app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);


/* app.get('/api/diagnoses', (_req, res) => {
  console.log('fetching diagnoses');
  res.json(diagnoses as Diagnosis[]);
}); */


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});