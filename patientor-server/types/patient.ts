export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export interface SensitivePatient extends Patient {
  ssn: string;
}

export type NewPatient = Omit<SensitivePatient, 'id'>;
