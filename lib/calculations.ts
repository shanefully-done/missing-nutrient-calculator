import { NutrientValues, CalculationResult } from "@/types";
import { getFilledInputs, getEmptyField, roundToDecimal } from "@/lib/utils";
import { validateResult } from "@/lib/validation";

export function calculateMissingNutrient(
	values: NutrientValues
): CalculationResult {
	const filledInputs = getFilledInputs(values);

	if (filledInputs.length !== 3) {
		return {
			value: 0,
			field: "calories",
			isValid: false,
			error: "Need exactly 3 inputs",
		};
	}

	const emptyField = getEmptyField(values);
	const result = performCalculation(values, emptyField);

	return {
		value: roundToDecimal(result, 1),
		field: emptyField,
		isValid: validateResult(result),
		error: validateResult(result) ? undefined : "Invalid calculation",
	};
}

function performCalculation(
	values: NutrientValues,
	missingField: keyof NutrientValues
): number {
	const calories = parseFloat(values.calories) || 0;
	const carbs = parseFloat(values.carbohydrates) || 0;
	const protein = parseFloat(values.protein) || 0;
	const fat = parseFloat(values.fat) || 0;

	switch (missingField) {
		case "calories":
			return carbs * 4 + protein * 4 + fat * 9;
		case "carbohydrates":
			return (calories - protein * 4 - fat * 9) / 4;
		case "protein":
			return (calories - carbs * 4 - fat * 9) / 4;
		case "fat":
			return (calories - carbs * 4 - protein * 4) / 9;
		default:
			return 0;
	}
}
