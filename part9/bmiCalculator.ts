const calculateBMI = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
    const classification =
        bmi < 18.5 ? "Underweight" : bmi >= 18.5 && bmi < 24.9 ? "Normal range" : bmi >= 25 && bmi < 29.9 ? "Overweight" : "Obese";
    return classification;
};

console.log(calculateBMI(180, 74));