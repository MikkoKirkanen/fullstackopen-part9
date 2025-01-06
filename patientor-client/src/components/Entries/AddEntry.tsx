import { useState } from 'react';
import EntryForm from './EntryForm';
import { Button } from '@mui/material';
import { Diagnosis, NewEntryForm } from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  onSubmitEntry: (values: NewEntryForm) => Promise<string[]>;
}

const AddEntry = ({ diagnoses, onSubmitEntry }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const onCancel = () => {
    setShowForm(false);
  };

  const getView = () => {
    if (!showForm) {
      return (
        <Button
          variant='contained'
          sx={{ marginTop: 2 }}
          onClick={() => setShowForm(true)}
        >
          Add new entry
        </Button>
      );
    }

    return (
      <EntryForm
        diagnoses={diagnoses}
        onCancel={onCancel}
        onSubmitEntry={onSubmitEntry}
      />
    );
  };

  return <div>{getView()}</div>;
};

export default AddEntry;
