import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../utils/types';

const apiBaseUrl = 'http://localhost:3000/api';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, entry);

  return data;
};

export default {
  getAll,
  create,
};
