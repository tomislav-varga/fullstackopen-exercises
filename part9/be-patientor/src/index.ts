import express from 'express';
import cors from 'cors';
import { Diagnosis, NonSensitivePatient, Patient } from '../types';
import diagnoses from '../data/diagnoses';
import patients from '../data/patients';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  console.log('fetching patients');
  const nonSensitivePatients: NonSensitivePatient[] = (patients as Patient[]).map(({ ssn: _ssn, ...rest }) => rest);
  res.json(nonSensitivePatients);
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('fetching diagnoses');
  res.json(diagnoses as Diagnosis[]);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});