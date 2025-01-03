import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patients';
import { NewPatientSchema } from '../utils/patients';
import { z } from 'zod';
import { NewPatient, Patient } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();
  res.send(patients);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const patient = patientsService.getPatient(req.params.id);
  res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.send(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
