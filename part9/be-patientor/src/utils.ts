import { NewPatientEntry, Gender } from "./types";
import z from 'zod';


export const NewPatientSchema= z.object({
        name: z.string(),
        dateOfBirth: z.string(),
        ssn: z.string().optional(),
        gender: z.enum([Gender.male, Gender.female, Gender.other]),
        occupation: z.string()
    });
 
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};