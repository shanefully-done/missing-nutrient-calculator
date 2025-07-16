export type Language = "en" | "ko";

export interface Translations {
	title: string;
	subtitle: string;
	calories: string;
	protein: string;
	carbs: string;
	fat: string;
	calculate: string;
	reset: string;
	result: string;
	error: string;
	invalidInput: string;
	outOfRange: string;
	tooManyInputs: string;
	negativeResult: string;
	nutritionalMismatch: string;
	language: string;
	english: string;
	korean: string;
	github: string;
	blog: string;
}

const translations: Record<Language, Translations> = {
	en: {
		title: "miscalc by shane.",
		subtitle: "Calculate the missing macronutrient value",
		calories: "Calories",
		protein: "Protein (g)",
		carbs: "Carbs (g)",
		fat: "Fat (g)",
		calculate: "Calculate",
		reset: "Reset",
		result: "Result",
		error: "Error",
		invalidInput: "Please enter valid numbers",
		outOfRange: "Values must be within reasonable ranges",
		tooManyInputs: "Please fill exactly 3 fields",
		negativeResult: "Calculation resulted in negative value",
		nutritionalMismatch: "Nutritional values don't match expected ratios",
		language: "Language",
		english: "English",
		korean: "한국어",
		github: "GitHub",
		blog: "Blog",
	},
	ko: {
		title: "miscalc by shane.",
		subtitle: "빠진 영양소를 계산하세요",
		calories: "칼로리",
		protein: "단백질 (g)",
		carbs: "탄수화물 (g)",
		fat: "지방 (g)",
		calculate: "계산하기",
		reset: "초기화",
		result: "결과",
		error: "오류",
		invalidInput: "올바른 숫자를 입력해주세요",
		outOfRange: "값이 적절한 범위 내에 있어야 합니다",
		tooManyInputs: "정확히 3개의 필드를 입력해주세요",
		negativeResult: "계산 결과가 음수입니다",
		nutritionalMismatch: "영양소 값이 예상 비율과 일치하지 않습니다",
		language: "언어",
		english: "English",
		korean: "한국어",
		github: "GitHub",
		blog: "블로그",
	},
};

export const getTranslation = (lang: Language): Translations =>
	translations[lang];

// Language change callback system
type LanguageChangeCallback = (lang: Language) => void;
const languageChangeCallbacks: LanguageChangeCallback[] = [];

export const onLanguageChange = (callback: LanguageChangeCallback) => {
	languageChangeCallbacks.push(callback);
	return () => {
		const index = languageChangeCallbacks.indexOf(callback);
		if (index > -1) {
			languageChangeCallbacks.splice(index, 1);
		}
	};
};

export const emitLanguageChange = (lang: Language) => {
	languageChangeCallbacks.forEach((callback) => callback(lang));
};
