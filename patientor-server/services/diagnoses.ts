import diagnosisData from '../data/diagnoses';
import { Diagnosis } from '../types/diagnosis';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

export default { getDiagnoses };
