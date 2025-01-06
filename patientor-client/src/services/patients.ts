import axios from 'axios';
import { Entry, NewEntryForm, Patient, PatientFormValues } from '../types';

import { apiPatientsUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(apiPatientsUrl);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiPatientsUrl}/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(apiPatientsUrl, object);

  return data;
};

const addEntry = async (id: string, newEntry: NewEntryForm) => {
  const { data } = await axios.post<Entry>(
    `${apiPatientsUrl}/${id}/entries`,
    newEntry
  );
  return data;
};

export default {
  getAll,
  getPatient,
  create,
  addEntry,
};
