interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  interface ExerciseInput {
    target: number;
    dailyExerciseHours: number[];
  }
  
  const parseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments. Usage: npm run calculateExercises <target> <daily exercise hours...>');
  
    const [,, targetArg, ...exerciseHours] = args;
    const target = Number(targetArg);
    const dailyExerciseHours = exerciseHours.map(Number);
  
    if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
      throw new Error('Invalid input. Target and daily exercise hours must be numbers.');
    }
  
    return { target, dailyExerciseHours };
  };
  
  const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "Excellent";
    } else if (average >= target * 0.8) {
      rating = 2;
      ratingDescription = "Good";
    } else {
      rating = 1;
      ratingDescription = "Needs improvement";
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };
  
  try {
    const { target, dailyExerciseHours } = parseArguments(process.argv);
    const result = calculateExercises(dailyExerciseHours, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'An error occurred: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
  
  export default calculateExercises;