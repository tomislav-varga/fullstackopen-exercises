import express from 'express';
import cors from 'cors';
import { Diagnosis, NonSensitivePatient, Patient } from '../types';
import diagnoses from '../data/diagnoses';
import patientsData from '../data/patients';
import addPatient from './services/patientService';

const app = express();

const patients: Patient[] = [...patientsData] as Patient[];

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  console.log('fetching patients');
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(({ ssn: _ssn, ...rest }) => rest);
  res.json(nonSensitivePatients);
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('fetching diagnoses');
  res.json(diagnoses as Diagnosis[]);
});

app.post('/api/patients', (req, res) => {
  try {
    const { id: _id, ...newPatientData } = req.body as Patient;
    
    const newPatient = addPatient(patients, newPatientData);

    const { ssn: _ssn, ...nonSensitivePatient } = newPatient;
    res.status(201).json(nonSensitivePatient as NonSensitivePatient);

  } catch {
    res.status(400).json({ error: 'Invalid patient data' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});