import { NewPatientEntry, Gender } from "./types";
import z from 'zod';


export const NewPatientSchema= z.object({
        name: z.string(),
        dateOfBirth: z.string(),
        ssn: z.string(),
        gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
        occupation: z.string()
    });
 
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};