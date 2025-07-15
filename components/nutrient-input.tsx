import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { NutrientValues } from "@/types";

interface NutrientInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	disabled: boolean;
	error?: string;
	placeholder: string;
	name: keyof NutrientValues;
	unit: string;
}

export function NutrientInput({
	label,
	value,
	onChange,
	disabled,
	error,
	placeholder,
	name,
	unit,
}: NutrientInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Allow only numbers and decimal point
		if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
			onChange(value);
		}
	};

	return (
		<div className="space-y-2">
			<Label
				htmlFor={name}
				className={cn("text-sm font-medium", disabled && "text-muted-foreground")}
			>
				{label}
			</Label>
			<div className="relative">
				<Input
					id={name}
					type="text"
					inputMode="decimal"
					value={value}
					onChange={handleChange}
					disabled={disabled}
					placeholder={placeholder}
					className={cn(
						"pr-12",
						error && "border-red-500 focus:ring-red-500",
						disabled && "bg-muted border-muted-foreground/20 cursor-not-allowed"
					)}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? `${name}-error` : undefined}
				/>
				<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
					{unit}
				</span>
			</div>
			{error && (
				<p id={`${name}-error`} className="text-sm text-red-500" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}
