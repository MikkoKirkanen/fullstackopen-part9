import { Diagnosis, Entry } from '../../types';
import EntryDetails from './EntryDetails';

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ entries, diagnoses }: Props) => {
  const getEntries = () => {
    if (!entries?.length) {
      return <div>There are no entries.</div>;
    }

    return entries.map((e) => (
      <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
    ));
  };

  return (
    <div>
      <h2>Entries</h2>
      {getEntries()}
    </div>
  );
};

export default Entries;
