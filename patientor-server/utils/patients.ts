import { Gender, NewPatient } from '../types/patient';
import { z } from 'zod';

const toNewPatient = (obj: unknown): NewPatient => {
  return NewPatientSchema.parse(obj);
};

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});

export default toNewPatient;
