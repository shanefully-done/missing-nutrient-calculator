export interface NutrientValues {
	calories: string;
	carbohydrates: string;
	protein: string;
	fat: string;
}

export interface CalculationResult {
	value: number;
	field: keyof NutrientValues;
	isValid: boolean;
	error?: string;
}

export interface ValidationError {
	field: keyof NutrientValues;
	message: string;
	type: "error" | "warning";
}

export type Language = "en" | "ko";
