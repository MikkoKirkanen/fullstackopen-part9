import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { NewDiaryEntry, Visibility, Weather } from '../utils/types';

interface Props {
  addEntry: (entry: NewDiaryEntry) => Promise<string>;
}

const AddEntryForm = ({ addEntry }: Props) => {
  const emptyEntry: NewDiaryEntry = {
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  };
  const [entry, setEntry] = useState<NewDiaryEntry>(emptyEntry);
  const [error, setError] = useState<string>('');

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setEntry((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    addEntry(entry)
      .then(() => {
        setError('');
        setEntry(emptyEntry);
      })
      .catch((e: string) => {
        setError(e);
      });
  };

  const getError = () => {
    if (!error) return null;

    return <div className='text-danger'>{error}</div>;
  };

  const getRadios = (name: string) => {
    let items: string[] = [];
    switch (name) {
      case 'visibility':
        items = Object.values(Visibility);
        break;
      case 'weather':
        items = Object.values(Weather);
        break;
      default:
        items = [];
    }

    return (
      <div>
        {items.map((item) => (
          <Form.Check
            key={name + '-' + item}
            type='radio'
            id={name + '-' + item}
            className='text-capitalize'
            name={name}
            label={item}
            value={item}
            checked={item === getRadioValue(name)}
            onChange={onValueChange}
          />
        ))}
      </div>
    );
  };

  const getRadioValue = (name: string) => {
    switch (name) {
      case 'visibility':
        return entry.visibility;
      case 'weather':
        return entry.weather;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {getError()}
      <form onSubmit={submit}>
        <Table className='w-auto' borderless>
          <tbody>
            <tr>
              <td className='align-middle'>
                <Form.Label htmlFor='date' className='mb-0'>
                  Date
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  id='date'
                  name='date'
                  type='date'
                  value={entry.date}
                  onChange={onValueChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label className='mb-0'>Visibility</Form.Label>
              </td>
              <td>{getRadios('visibility')}</td>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor='weather' className='mb-0'>
                  Weather
                </Form.Label>
              </td>
              <td>{getRadios('weather')}</td>
            </tr>
            <tr>
              <td className='align-middle'>
                <Form.Label htmlFor='comment' className='mb-0'>
                  Comment
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  id='comment'
                  name='comment'
                  type='text'
                  value={entry.comment}
                  onChange={onValueChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Button type='submit' variant='primary'>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default AddEntryForm;
