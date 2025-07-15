import { useState, useEffect } from "react";
import { NutrientValues, CalculationResult } from "@/types";
import { calculateMissingNutrient } from "@/lib/calculations";
import { validateNutrientInput } from "@/lib/validation";

export function useNutrientCalculator() {
	const [nutrients, setNutrients] = useState<NutrientValues>({
		calories: "",
		carbohydrates: "",
		protein: "",
		fat: "",
	});

	const [result, setResult] = useState<CalculationResult | null>(null);
	const [errors, setErrors] = useState<Record<keyof NutrientValues, string>>({
		calories: "",
		carbohydrates: "",
		protein: "",
		fat: "",
	});

	const handleInputChange = (field: keyof NutrientValues, value: string) => {
		// Clear previous errors for this field
		setErrors((prev) => ({ ...prev, [field]: "" }));

		// Validate input
		if (value.trim() !== "") {
			const isValid = validateNutrientInput(
				value,
				field === "calories" ? "calories" : "macro"
			);

			if (!isValid) {
				setErrors((prev) => ({
					...prev,
					[field]:
						field === "calories"
							? "Please enter a value between 1-9999"
							: "Please enter a value between 0-999",
				}));
				return;
			}
		}

		// Update nutrients
		setNutrients((prev) => ({ ...prev, [field]: value }));
	};

	const reset = () => {
		setNutrients({
			calories: "",
			carbohydrates: "",
			protein: "",
			fat: "",
		});
		setResult(null);
		setErrors({
			calories: "",
			carbohydrates: "",
			protein: "",
			fat: "",
		});
	};

	// Calculate when exactly 3 inputs are filled
	useEffect(() => {
		const filledInputs = Object.values(nutrients).filter((v) => v.trim() !== "");

		if (filledInputs.length === 3) {
			const calculationResult = calculateMissingNutrient(nutrients);
			setResult(calculationResult);
		} else {
			setResult(null);
		}
	}, [nutrients]);

	return {
		nutrients,
		result,
		errors,
		handleInputChange,
		reset,
	};
}
