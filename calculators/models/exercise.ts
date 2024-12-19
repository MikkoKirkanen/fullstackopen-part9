export interface ExerciseResult {
  periodLength?: number;
  trainingDays?: number;
  success?: boolean;
  rating?: number;
  ratingDescription?: string;
  target?: number;
  average?: number;
}

export interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}
