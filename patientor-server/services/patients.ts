import patientData from '../data/patients';
import { SensitivePatient, Patient } from '../types/patient';

const getPatients = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSensitivePatients = (): SensitivePatient[] => {
  return patientData;
};

export default { getPatients, getSensitivePatients };
