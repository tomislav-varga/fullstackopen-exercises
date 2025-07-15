import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('fetching patients');
    res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {

        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(patientService.getPatients(), newPatient);
        res.status(201).json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        res.status(400).json({ error: 'Something went wrong' });
    }
});

export default router;
