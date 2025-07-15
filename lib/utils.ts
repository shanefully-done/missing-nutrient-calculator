import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NutrientValues } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFilledInputs(
	values: NutrientValues
): (keyof NutrientValues)[] {
	return (Object.keys(values) as (keyof NutrientValues)[]).filter(
		(key) => values[key].trim() !== ""
	);
}

export function getEmptyField(values: NutrientValues): keyof NutrientValues {
	const entries = Object.entries(values) as [keyof NutrientValues, string][];
	const emptyEntry = entries.find(([, value]) => value.trim() === "");
	return emptyEntry?.[0] || "calories";
}

export function shouldDisableInput(
	values: NutrientValues,
	inputName: keyof NutrientValues
): boolean {
	const filledInputs = getFilledInputs(values);
	return filledInputs.length === 3 && !values[inputName];
}

export function roundToDecimal(value: number, decimals: number): number {
	return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
