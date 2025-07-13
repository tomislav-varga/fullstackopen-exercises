import { Patient } from "../../types"; 
import { v4 as uuidv4 } from 'uuid';


const addPatient = (patients: Patient[], newPatient: Omit<Patient, 'id'>): Patient => {
  const patientWithId: Patient = {
    id: uuidv4(),
    ...newPatient,
  };
  patients.push(patientWithId);
  return patientWithId;
};

export default addPatient;