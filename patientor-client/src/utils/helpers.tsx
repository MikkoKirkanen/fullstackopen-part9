import { green, yellow, orange, red } from '@mui/material/colors';
import { Entry, EntryType, HealthCheckRating } from '../types';

export const healthCheckRatingColor = (entry: Entry): { color?: string } => {
  if (entry.type === EntryType.HealthCheck) {
    let color = '';
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        color = green[500];
        break;
      case HealthCheckRating.LowRisk:
        color = yellow[500];
        break;
      case HealthCheckRating.HighRisk:
        color = orange[500];
        break;
      case HealthCheckRating.CriticalRisk:
        color = red[500];
        break;
    }
    return { color };
  }

  return {};
};
