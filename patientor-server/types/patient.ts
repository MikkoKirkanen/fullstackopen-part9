import { z } from 'zod';
import { NewEntrySchema, NewPatientSchema } from '../utils/patients';
import { Diagnosis } from './diagnosis';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital | 'Hospital';
  discharge: { date: string; criteria: string };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare | 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck | 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
