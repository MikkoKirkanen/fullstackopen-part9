import { JSX, SyntheticEvent, useState } from 'react';
import {
  Diagnosis,
  Entry,
  EntryType,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewEntryForm,
  OccupationalHealthcareEntry,
} from '../../types';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/fi';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { healthCheckRatingColor } from '../../utils/helpers';

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmitEntry: (values: NewEntryForm) => Promise<string[]>;
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const entryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString().replace(/([a-z])([A-Z])/g, '$1 $2'),
}));

const healthCheckRatingMax: number = Object.keys(HealthCheckRating).filter(
  (k) => isNaN(Number(k))
).length;

const EntryForm = ({ diagnoses, onCancel, onSubmitEntry }: Props) => {
  const [type, setType] = useState<EntryType | ''>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(
    null
  );
  const [color, setColor] = useState({});
  const [ratingLabel, setRatingLabel] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [criteria, setCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const diagnosisCodeOptions: string[] = diagnoses.map((d) => d.code);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let form: NewEntryForm = {
      type: type as EntryType,
      description,
      date: date?.format('YYYY-MM-DD') || '',
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case EntryType.Hospital:
        (form as HospitalEntry).discharge = {
          date: dischargeDate?.format('YYYY-MM-DD') || '',
          criteria,
        };
        break;
      case EntryType.OccupationalHealthcare:
        const oForm = form as OccupationalHealthcareEntry;
        oForm.employerName = employerName;
        if (startDate && endDate) {
          oForm.sickLeave = {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
          };
        }
        break;
      case EntryType.HealthCheck:
        (form as HealthCheckEntry).healthCheckRating =
          healthCheckRating as number;
        break;
    }

    setShowSuccess(false);
    setErrors([]);

    onSubmitEntry(form)
      .then(() => {
        setShowSuccess(true);
        clearForm();
      })
      .catch((e: string[]) => {
        setErrors(e);
      });
  };

  const clearForm = () => {
    setType('');
    setDescription('');
    setDate(null);
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(null);
    setColor({});
    setRatingLabel('');
    setRating(null);
    setDischargeDate(null);
    setCriteria('');
    setEmployerName('');
    setStartDate(null);
    setEndDate(null);
  };

  const handleEntryChange = (e: SelectChangeEvent<string>) => {
    const value = EntryType[e.target.value as keyof typeof EntryType];
    setType(value);
  };

  const handleDiagnosisCodesChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    setDiagnosisCodes(value);
  };

  const onRatingChangeActive = (newValue: number) => {
    let value;
    if (newValue === -1) {
      value = healthCheckRating;
    } else {
      value = healthCheckRatingMax - newValue;
    }
    const entry = { type, healthCheckRating: value } as Entry;
    setColor(healthCheckRatingColor(entry));
    const label =
      value === null
        ? ''
        : HealthCheckRating[value]?.replace(/([a-z])([A-Z])/g, '$1 $2') || '';
    setRatingLabel(label);
  };

  const handleRatingChange = (newValue: number | null) => {
    const value = newValue !== null ? healthCheckRatingMax - newValue : null;
    setRating(newValue);
    setHealthCheckRating(value);
  };

  const getHealthCheckRating = (): JSX.Element | null => {
    if (type !== EntryType.HealthCheck) return null;

    return (
      <Box>
        <Typography component='legend'>Health check rating</Typography>
        <Box display='flex'>
          <Rating
            sx={{ ...color, marginRight: 2 }}
            name='health-check-rating'
            value={rating}
            max={healthCheckRatingMax}
            size='large'
            icon={<FavoriteIcon fontSize='inherit' />}
            emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
            onChangeActive={(_event, newHover) => {
              onRatingChangeActive(newHover);
            }}
            onChange={(_event, newValue) => handleRatingChange(newValue)}
          />
          <Box component='span' fontSize={20}>
            {ratingLabel}
          </Box>
        </Box>
      </Box>
    );
  };

  const getHospitalEntry = () => {
    if (type !== EntryType.Hospital) return null;

    return (
      <Box marginTop={2}>
        <InputLabel>Discharge</InputLabel>
        <Box paddingLeft={2}>
          <Box sx={{ width: 160 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
              <DatePicker
                label='Date'
                value={dischargeDate}
                onChange={(d) => setDischargeDate(d)}
                slotProps={{
                  textField: { variant: 'standard' },
                }}
              />
            </LocalizationProvider>
          </Box>
          <TextField
            id='criteria'
            label='Criteria'
            variant='standard'
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </Box>
      </Box>
    );
  };
  const getOccupationalHealthcareEntry = () => {
    if (type !== EntryType.OccupationalHealthcare) return null;

    return (
      <Box>
        <TextField
          id='employerName'
          label='Employer name'
          variant='standard'
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <Box marginTop={2}>
          <InputLabel>Sick leave</InputLabel>
          <Box paddingLeft={2}>
            <Box sx={{ width: 160 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='fi'
              >
                <DatePicker
                  label='Start date'
                  value={startDate}
                  onChange={(d) => setStartDate(d)}
                  slotProps={{
                    textField: { variant: 'standard' },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: 160 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='fi'
              >
                <DatePicker
                  label='End date'
                  value={endDate}
                  onChange={(d) => setEndDate(d)}
                  slotProps={{
                    textField: { variant: 'standard' },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const submitSuccessAlert = () => {
    if (!showSuccess) return;

    return (
      <Alert variant='filled' severity='success' sx={{ marginBottom: 3 }}>
        <AlertTitle>The entry has been submitted successfully</AlertTitle>
      </Alert>
    );
  };

  const errorsAlert = () => {
    if (!errors?.length) return null;

    return (
      <Alert variant='filled' severity='error' sx={{ marginBottom: 3 }}>
        <AlertTitle>Error</AlertTitle>
        <List
          sx={{
            listStyleType: 'disc',
            listStylePosition: 'inside',
            padding: 0,
          }}
        >
          {errors.map((e, i) => (
            <ListItem key={i} sx={{ display: 'list-item', padding: 0 }}>
              {e}
            </ListItem>
          ))}
        </List>
      </Alert>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>New entry</h2>
      {submitSuccessAlert()}
      {errorsAlert()}
      <Box
        border='dashed 1px'
        borderRadius={4}
        padding={2}
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <FormControl variant='standard' fullWidth>
          <InputLabel id='entry-type-select-label'>Entry type</InputLabel>
          <Select
            labelId='entry-type-select-label'
            id='entry-type'
            value={type}
            onChange={handleEntryChange}
          >
            {entryOptions.map((o) => (
              <MenuItem key={o.label} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id='description'
          label='Description'
          variant='standard'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Box sx={{ width: 160 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
            <DatePicker
              label='Date'
              value={date}
              onChange={(d) => setDate(d)}
              slotProps={{ textField: { variant: 'standard' } }}
            />
          </LocalizationProvider>
        </Box>
        <TextField
          id='specialist'
          label='Specialist'
          variant='standard'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {getHealthCheckRating()}
        <FormControl variant='standard'>
          <InputLabel id='diagnoses-mutiple-select-label'>Diagnoses</InputLabel>
          <Select
            labelId='diagnoses-mutiple-select-label'
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            renderValue={(diagnosisCodes) => diagnosisCodes.join(', ')}
          >
            {diagnosisCodeOptions.map((code) => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={diagnosisCodes.includes(code)} />
                <ListItemText primary={code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {getHospitalEntry()}
        {getOccupationalHealthcareEntry()}
        <Box display='flex' justifyContent='space-between'>
          <Button variant='contained' color='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' color='success'>
            Add
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EntryForm;
