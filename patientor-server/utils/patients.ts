import { EntryType, Gender } from '../types/patient';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});

export const NewEntrySchema = z
  .object({
    type: z.nativeEnum(EntryType, {
      errorMap: () => {
        return { message: 'Entry type is required' };
      },
    }),
    description: z.string().nonempty('Description is required'),
    date: z.string().nonempty('Date is required').date('Date is invalid'),
    specialist: z.string().min(1, { message: 'Specialist is required' }),
    diagnosisCodes: z.array(z.string()),
    discharge: z
      .object({
        date: z
          .string()
          .nonempty('Discharge date is required')
          .date('Discharge date is invalid'),
        criteria: z.string().min(1, { message: 'Criteria is required' }),
      })
      .optional(),
    employerName: z.string().optional(),
    sickLeave: z
      .object({
        startDate: z
          .string()
          .date('Sick leave start date is invalid')
          .optional(),
        endDate: z.string().date('Sick leave end date is invalid').optional(),
      })
      .optional(),
    healthCheckRating: z.number().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.type === EntryType.HealthCheck) {
      if (data.healthCheckRating === null)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Health check rating is required',
        });
    }
    if (data.type === EntryType.OccupationalHealthcare) {
      if (data.employerName === '')
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Employer name is required',
        });
    }
  });

export default {};
