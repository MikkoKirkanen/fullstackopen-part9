import { z } from 'zod';
import { NewPatientSchema } from '../utils/patients';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  occupation: string;
  gender: Gender;
}

export interface SensitivePatient extends Patient {
  ssn: string;
}
