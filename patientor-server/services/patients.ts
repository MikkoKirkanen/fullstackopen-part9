import patientData from '../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types/patient';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getSensitivePatients = (): Patient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatient, getSensitivePatients, addPatient };
