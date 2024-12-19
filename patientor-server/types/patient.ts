export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export interface SensitivePatient extends Patient {
  ssn: string;
}
