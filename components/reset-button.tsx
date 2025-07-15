"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface ResetButtonProps {
	onReset: () => void;
	disabled?: boolean;
}

export function ResetButton({ onReset, disabled }: ResetButtonProps) {
	const { t } = useLanguage();

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={onReset}
			disabled={disabled}
			className="flex items-center gap-2"
			aria-label={t.reset}
		>
			<RotateCcw className="h-4 w-4" />
			<span className="hidden sm:inline">{t.reset}</span>
		</Button>
	);
}
