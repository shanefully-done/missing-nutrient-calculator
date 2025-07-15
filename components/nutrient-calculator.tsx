"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NutrientInput } from "@/components/nutrient-input";
import { ResetButton } from "@/components/reset-button";
import { useNutrientCalculator } from "@/hooks/use-nutrient-calculator";
import { useLanguage } from "@/hooks/use-language";
import { shouldDisableInput } from "@/lib/utils";
import { NutrientValues } from "@/types";

export function NutrientCalculator() {
	const { nutrients, result, errors, handleInputChange, reset } =
		useNutrientCalculator();
	const { t } = useLanguage();

	const nutrientFields: Array<{
		key: keyof NutrientValues;
		label: string;
		placeholder: string;
		unit: string;
	}> = [
		{ key: "calories", label: t.calories, placeholder: "0", unit: "kcal" },
		{ key: "carbohydrates", label: t.carbs, placeholder: "0", unit: "g" },
		{ key: "protein", label: t.protein, placeholder: "0", unit: "g" },
		{ key: "fat", label: t.fat, placeholder: "0", unit: "g" },
	];

	const hasErrors = Object.values(errors).some((error) => error);

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>{t.title}</CardTitle>
				<CardDescription>{t.subtitle}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{nutrientFields.map(({ key, label, placeholder, unit }) => (
						<NutrientInput
							key={key}
							name={key}
							label={label}
							value={nutrients[key]}
							onChange={(value) => handleInputChange(key, value)}
							disabled={shouldDisableInput(nutrients, key)}
							error={errors[key]}
							placeholder={placeholder}
							unit={unit}
							aria-label={`${label} input`}
						/>
					))}
				</div>

				{hasErrors && (
					<Alert variant="destructive" role="alert">
						<AlertDescription>
							{errors.calories || errors.carbohydrates || errors.protein || errors.fat}
						</AlertDescription>
					</Alert>
				)}

				{result && (
					<div className="space-y-4">
						<div className="border-t pt-4">
							<h3 className="text-lg font-semibold mb-2">{t.result}</h3>
							<div className="bg-muted/50 rounded-lg p-4">
								<p className="text-2xl font-bold text-primary">
									{result.value.toFixed(1)} {getUnitForField(result.field)}
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									{t.result}: {nutrientFields.find((f) => f.key === result.field)?.label}
								</p>
								{result.error && (
									<Alert variant="destructive" className="mt-2" role="alert">
										<AlertDescription>{result.error}</AlertDescription>
									</Alert>
								)}
							</div>
						</div>
					</div>
				)}

				<div className="flex justify-end">
					<ResetButton onReset={reset} />
				</div>
			</CardContent>
		</Card>
	);
}

function getUnitForField(field: keyof NutrientValues): string {
	switch (field) {
		case "calories":
			return "kcal";
		case "carbohydrates":
		case "protein":
		case "fat":
			return "g";
		default:
			return "";
	}
}
