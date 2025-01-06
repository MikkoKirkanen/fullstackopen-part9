import axios from 'axios';
import { Diagnosis } from '../types';

import { apiDiagnosesUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(apiDiagnosesUrl);

  return data;
};

export default {
  getAll,
};
