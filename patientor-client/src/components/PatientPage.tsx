import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Gender, Patient } from '../types';
import { Female, Male, Transgender } from '@mui/icons-material';

const PatientPage = () => {
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

  return (
    <div>
      <h1>
        {patient.name} {getGender()}
      </h1>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
