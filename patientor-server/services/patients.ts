import patientData from '../data/patients';
import { SensitivePatient, Patient, NewPatient } from '../types/patient';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData as SensitivePatient[];

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })) as Patient[];
};

const getSensitivePatients = (): SensitivePatient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getSensitivePatients, addPatient };
