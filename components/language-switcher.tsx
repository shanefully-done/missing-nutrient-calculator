"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
	const { language, changeLanguage, t } = useLanguage();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-2"
					aria-label={t.language}
				>
					<Globe className="h-4 w-4" />
					<span className="hidden sm:inline">
						{language === "en" ? t.english : t.korean}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => changeLanguage("en")}>
					{t.english}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLanguage("ko")}>
					{t.korean}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
