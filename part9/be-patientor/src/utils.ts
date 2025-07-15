import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string: ' + string);
    }
    return string;
};


const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (!('name' in object) || !('dateOfBirth' in object) || !('ssn' in object) || !('gender' in object) || !('occupation' in object)) {
        throw new Error('Incorrect data: some fields are missing');
    }
    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    }; 
    return newPatient;
};

export default toNewPatient;