interface BmiValues {
    height: number;
    weight: number;
}
const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments provided. Expected height and weight.');
    if (args.length > 4) throw new Error('Too many arguments provided. Expected only height and weight.');

    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        throw new Error('Invalid input. Height and weight must be numbers.');
    }
    if (Number(args[2]) <= 0 || Number(args[3]) <= 0) {
        throw new Error('Invalid input. Height and weight must be positive numbers.');
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3]),
    };
};

const calculateBMI = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
    const classification =
        bmi < 18.5 ? "Underweight" : bmi >= 18.5 && bmi < 24.9 ? "Normal range" : bmi >= 25 && bmi < 29.9 ? "Overweight" : "Obese";
    return classification;
};

try {
    const {height, weight} = parseArguments(process.argv);
    const bmiClassification = calculateBMI(height, weight);
    console.log(`Your BMI is: ${bmiClassification}`);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

  export default calculateBMI;