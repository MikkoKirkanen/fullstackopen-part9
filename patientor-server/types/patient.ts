import { z } from 'zod';
import { NewPatientSchema } from '../utils/patients';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export type NewPatient = z.infer<typeof NewPatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
