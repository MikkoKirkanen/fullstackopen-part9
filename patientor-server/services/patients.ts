import patientData from '../data/patients-full';
import {
  Patient,
  NewPatient,
  NonSensitivePatient,
  NewEntry,
  Entry,
} from '../types/patient';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData;

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

const addEntry = (id: string, entry: NewEntry): Entry | null => {
  const newEntry: Entry = {
    id: uuidv4(),
    ...entry,
  } as Entry;
  const patient = getPatient(id);
  if (!patient) {
    return null;
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getSensitivePatients,
  addPatient,
  addEntry,
};
