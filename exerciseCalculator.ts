import { ExerciseResult } from './models/exercise';

const calculateExercises = (
  origTarget: number,
  exercises: number[]
): ExerciseResult => {
  const total = exercises.reduce((a, b) => a + b, 0),
    periodLength = exercises.length,
    trainingDays = exercises.filter((e) => e > 0).length,
    success = total >= origTarget * periodLength,
    average = total / periodLength,
    rating = getRating(average),
    ratingDescription = getRatingDescription(rating),
    target = origTarget;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const getRating = (average: number): number => {
  if (average < 0.5) {
    return 1;
  } else if (average < 1) {
    return 2;
  } else {
    return 3;
  }
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Need more exercise';
    case 2:
      return 'Not too bad but could be better';
    case 3:
      return 'Great achievement!';
    default:
      return '';
  }
};

export const calculateExercisesJson = (
  target: number,
  exercises: number[]
): ExerciseResult => {
  

  const result = calculateExercises(target, exercises);
  return result;
};

const getArgs = () => {
  const args = process.argv.slice(2).map((a) => Number(a));

  // if no args then show the guide
  if (args.length === 0) throw new Error('Guide');
  if (args.length < 2)
    throw new Error('Not enough arguments, at least two are required');

  if (!args.every((a) => !isNaN(a)))
    throw new Error('Provided values were not all numbers!');

  return {
    target: args[0],
    exercises: args.slice(1),
  };
};

if (require.main === module) {
  try {
    const { target, exercises } = getArgs();
    const res = calculateExercises(target, exercises);
    console.log(res);
  } catch (e: unknown) {
    let message = '';
    if (e instanceof Error) {
      message =
        e.message === 'Guide'
          ? e.message
          : 'Calculation failed!\nError: ' + e.message;
    }
    message +=
      '\nUsage: npm run calculateExercises <target> <day1> <day2> <day3>...';
    message += '\n<target> = Daily exercise goal in hours, example 1.5';
    message += '\n<day#> = #th day of practice in hours, example 2';
    message += '\nExample command: npm run calculateExercises 2 1 2.5 3 2';
    console.log(message);
  }
}
