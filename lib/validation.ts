export function validateNutrientInput(
	value: string,
	type: "calories" | "macro"
): boolean {
	const num = parseFloat(value);
	if (isNaN(num) || num < 0) return false;

	if (type === "calories") return num >= 1 && num <= 9999;
	if (type === "macro") return num >= 0 && num <= 999;

	return true;
}

export function validateNutritionalLogic(
	calories: number,
	carbs: number,
	protein: number,
	fat: number
): boolean {
	const calculatedCalories = carbs * 4 + protein * 4 + fat * 9;
	return Math.abs(calories - calculatedCalories) <= 5; // Tolerance of 5 calories
}

export function validateResult(value: number): boolean {
	return !isNaN(value) && isFinite(value) && value >= 0;
}
