import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Entry, Gender, NewEntryForm, Patient } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';
import Entries from '../Entries/Entries';
import AddEntry from '../Entries/AddEntry';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const params = useParams();
  const id = params.id || '';
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const getPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    getPatient();
  }, []);

  if (!patient) {
    return <div>Patient not found!</div>;
  }

  const getGender = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <Transgender />;
    }
  };

  const submitEntry = (entry: NewEntryForm): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      patientService
        .addEntry(patient.id, entry)
        .then((res: Entry) => {
          setPatient({
            ...patient,
            entries: [...patient.entries, res],
          });
          resolve([]);
        })
        .catch(({ response }) => {
          const errors = response?.data?.error?.map(
            (e: { message: string }) => e.message
          );
          reject(errors);
        });
    });
  };

  return (
    <div>
      <h1>
        {patient.name} {getGender()}
      </h1>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <AddEntry diagnoses={diagnoses} onSubmitEntry={submitEntry} />
      <Entries entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientPage;
