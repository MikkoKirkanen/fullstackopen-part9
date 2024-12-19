import { Gender, NewPatient } from '../types/patient';

const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'ssn' in obj &&
    'dateOfBirth' in obj &&
    'occupation' in obj &&
    'gender' in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      ssn: parseSsn(obj.ssn),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
      occupation: parseOccupation(obj.occupation),
      gender: parseGender(obj.gender),
    };
    return newPatient;
  }

  throw new Error('Invalid data: some fields are missing');
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing or invalid name');
  }
  return name;
};

const parseSsn = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Missing or invalid social security number');
  }
  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Missing or invalid date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Missing or invalid occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Missing or invalid gender: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  const regexp =
    /[1-2][0-9]{3}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
  return regexp.test(date);
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

export default toNewPatient;
