import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatient, Patient } from "../types";
import patientsData from '../../data/patients';

const patients: Patient[] = patientsData as Patient[];

const addPatient = (patients: Patient[], newPatient: Omit<Patient, 'id'>): Patient => {
  const patientWithId: Patient = {
    id: uuidv4(),
    ...newPatient,
  };
  patients.push(patientWithId);
  return patientWithId;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
  
};

const getPatients = (): Patient[] => {
  return patients;
};

export default {
  addPatient,
  getNonSensitivePatients,
  getPatients,
};