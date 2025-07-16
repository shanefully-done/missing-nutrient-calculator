"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
	};

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="h-4 w-4" />;
			case "dark":
				return <Moon className="h-4 w-4" />;
			default:
				return <Laptop className="h-4 w-4" />;
		}
	};

	const getThemeLabel = () => {
		switch (theme) {
			case "light":
				return "Light";
			case "dark":
				return "Dark";
			default:
				return "System";
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-2 h-9"
					aria-label="Change theme"
				>
					{getThemeIcon()}
					<span className="hidden sm:inline">{getThemeLabel()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					<Sun className="h-4 w-4 mr-2" />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					<Moon className="h-4 w-4 mr-2" />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("system")}>
					<Laptop className="h-4 w-4 mr-2" />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
