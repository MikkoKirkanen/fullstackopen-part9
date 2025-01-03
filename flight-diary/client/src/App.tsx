import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import diariesService from './services/diaries';
import AddEntryForm from './components/AddEntryForm';
import DiaryEntries from './components/DiaryEntries';
import { DiaryEntry, NewDiaryEntry } from './utils/types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getDiaries = async () => {
      const diaries = await diariesService.getAll();
      setDiaries(diaries);
    };

    getDiaries();
  }, []);

  const addEntry = (newEntry: NewDiaryEntry) => {
    return new Promise<string>((resolve, reject) => {
      diariesService
        .create(newEntry)
        .then((res: DiaryEntry) => {
          setDiaries((state) => [...state, res]);
          resolve('');
        })
        .catch(({ response }) => {
          reject(response.data as string);
        });
    });
  };

  return (
    <Container>
      <h1>Flight diary</h1>
      <AddEntryForm addEntry={addEntry} />
      <DiaryEntries diaries={diaries} />
    </Container>
  );
}

export default App;
