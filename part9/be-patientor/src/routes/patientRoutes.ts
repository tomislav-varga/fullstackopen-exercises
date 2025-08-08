import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';
import { NewPatientEntry, Patient, NonSensitivePatient } from '../types';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    console.log('fetching patients');
    res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
        return res.status(404).send({ error: 'Patient not found' });
    }
    return res.json(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const newPatient = { ...req.body, entries: [] };
    const addedPatient = patientService.addPatient(patientService.getPatients(), newPatient);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
