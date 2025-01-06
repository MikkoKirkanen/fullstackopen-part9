import { Box } from '@mui/material';
import { Diagnosis, Entry, EntryType, HealthCheckEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { healthCheckRatingColor } from '../../utils/helpers';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const getIcon = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.Hospital:
        return <LocalHospitalIcon />;
      case EntryType.OccupationalHealthcare:
        return (
          <span>
            <MedicalServicesIcon />
            <Box component='span' sx={{ fontStyle: 'italic' }}>
              {' '}
              {entry.employerName}
            </Box>
          </span>
        );
      case EntryType.HealthCheck:
        return <MonitorHeartIcon />;
      default:
        return assertNever(entry);
    }
  };

  const getHealthCheck = (entry: Entry) => {
    const color = healthCheckRatingColor(entry);
    if (!Object.keys(color).length) return;

    return <FavoriteIcon sx={{ color }} />;
  };

  const getDiagnosisCodes = (dcs: string[] | undefined) => {
    if (!dcs?.length) return null;

    return (
      <ul>
        {dcs.map((dc) => (
          <li key={dc}>
            {dc} {getCodeDescription(dc)}
          </li>
        ))}
      </ul>
    );
  };

  const getCodeDescription = (code: string): string =>
    diagnoses.find((d) => d.code === code)?.name || '';

  const diagnoseBy = (entry: Entry) => {
    return 'Diagnose by ' + entry?.specialist || '';
  };

  return (
    <Box sx={{ borderRadius: 2, p: 1, border: 1, mb: 1 }}>
      <div>
        <Box component='span' sx={{ fontWeight: 'bold', mr: 0.5 }}>
          {entry.date}
        </Box>
        {getIcon(entry)}
      </div>
      <Box component='div' sx={{ fontStyle: 'italic' }}>
        {entry.description}
      </Box>
      <div>{getHealthCheck(entry)}</div>
      <div>{getDiagnosisCodes(entry?.diagnosisCodes)}</div>
      <div>{diagnoseBy(entry)}</div>
    </Box>
  );
};

const assertNever = (entry: HealthCheckEntry) => {
  throw new Error('Function not implemented: ' + entry.type);
};

export default EntryDetails;
