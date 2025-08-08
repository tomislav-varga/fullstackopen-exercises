import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatient, Patient } from "../types";
import patientsData from '../../data/patients';

// Ensure all patients have entries array
const patients: Patient[] = (patientsData as Patient[]).map(patient => ({
  ...patient
}));

const addPatient = (patients: Patient[], newPatient: Omit<Patient, 'id'>): Patient => {
  const patientWithId: Patient = {
    id: uuidv4(),
    ...newPatient,
  };
  patients.push(patientWithId);
  return patientWithId;
};

const findById = (id: string): Patient | undefined => {
  const patientWithId = patients.find(patient => patient.id === id);
  if (!patientWithId) {
    throw new Error(`Patient with id ${id} not found`);
  }
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
  findById,
};