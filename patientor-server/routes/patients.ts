import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
