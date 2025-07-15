"use client";

import { useState, useEffect, useCallback } from "react";
import {
	Language,
	getTranslation,
	onLanguageChange,
	emitLanguageChange,
} from "@/lib/translations";

export function useLanguage() {
	const [language, setLanguage] = useState<Language>("en");
	const [_, forceUpdate] = useState({});

	useEffect(() => {
		const saved = localStorage.getItem("language") as Language;
		if (saved && (saved === "en" || saved === "ko")) {
			setLanguage(saved);
		}

		// Listen for storage changes from other tabs
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "language" && e.newValue) {
				const newLang = e.newValue as Language;
				if (newLang === "en" || newLang === "ko") {
					setLanguage(newLang);
					forceUpdate({});
				}
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	useEffect(() => {
		// Subscribe to language change callbacks
		const unsubscribe = onLanguageChange((newLang) => {
			setLanguage(newLang);
			forceUpdate({});
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const changeLanguage = useCallback((lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("language", lang);
		emitLanguageChange(lang);
	}, []);

	const t = getTranslation(language);

	return {
		language,
		changeLanguage,
		t,
	};
}
