interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
    
  }

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const success = trainingDays >= Math.round(periodLength * 0.75);
    const rating = success ? 1 : trainingDays >= Math.round(periodLength * 0.5) ? 2 : 3;
    const ratingDescription = success ? "Excellent" : trainingDays >= Math.round(periodLength * 0.5) ? "Good" : "Needs improvement";
    const totalHours = dailyExerciseHours.reduce((total, hours) => total + hours, 0);
    const average = totalHours / periodLength;
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));