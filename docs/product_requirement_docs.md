# miscalc - Product Requirements Document

## Project Overview

Build a modern web application for calculating missing macronutrient values using Next.js 15 and shadcn/ui components. The application helps users determine the missing nutrient (calories, carbohydrates, protein, or fat) when three of the four values are provided.

## Core Functionality

### Purpose

Calculate missing macronutrient values based on standard nutritional conversion rates:

- **Carbohydrates**: 4 calories per gram
- **Protein**: 4 calories per gram
- **Fat**: 9 calories per gram
- **Total Calories** = (Carbs × 4) + (Protein × 4) + (Fat × 9)

### Calculation Logic

- If calories missing: `(carbs × 4) + (protein × 4) + (fat × 9)`
- If carbs missing: `(calories - (protein × 4) - (fat × 9)) / 4`
- If protein missing: `(calories - (carbs × 4) - (fat × 9)) / 4`
- If fat missing: `(calories - (carbs × 4) - (protein × 4)) / 9`

Results are rounded to 1 decimal place for practical nutrition label use.

## User Experience Design

### User Flow

1. **Initial State**: All 4 input boxes are empty and enabled.
2. **Input Phase**: User fills 3 out of 4 input boxes with nutrient values.
3. **Calculation State**:
   - The remaining empty box becomes disabled (visually distinct).
   - The calculated missing nutrient displays below the input group.
4. **Reset Option**: User can reset all values to start over.
5. **Modification**: User can remove values from filled boxes to recalculate different nutrients.

### Interactive Behavior

1. **Auto-disable Logic**: When 3 inputs have values, the 4th input becomes disabled.
2. **Instant Calculation**: The result displays immediately when 3 values are entered.
3. **Reset Functionality**: A "Reset" button clears all inputs and re-enables all fields.
4. **Dynamic Re-enabling**: Removing a value from any filled input re-enables the disabled input.
5. **No Debouncing Needed**: Calculations only trigger when exactly 3 inputs are filled.

### Visual States

- **Empty Input**: Normal shadcn/ui input styling.
- **Filled Input**: Input with a value, normal styling.
- **Disabled Input**: Visually distinct (grayed out, different border).
- **Result Display**: Prominent display of the calculated value below the inputs.
- **Error State**: Red styling for validation errors.
- **Success State**: Green accent for successful calculations.

## Technical Requirements

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

### Component Architecture

#### 1\. Main Calculator Component

```typescript
// Example: @/components/nutrient-calculator.tsx
import { NutrientInput } from "@/components/nutrient-input";
import { ResultDisplay } from "@/components/result-display";
import { useNutrientCalculator } from "@/hooks/use-nutrient-calculator";

interface NutrientValues {
	calories: string;
	carbohydrates: string;
	protein: string;
	fat: string;
}

interface CalculationResult {
	value: number;
	field: keyof NutrientValues;
	isValid: boolean;
	error?: string;
}
```

#### 2\. Enhanced Input Component

```typescript
interface NutrientInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	disabled: boolean;
	error?: string;
	placeholder: string;
}
```

#### 3\. Result Display Component

```typescript
interface ResultDisplayProps {
	result: CalculationResult | null;
	language: "en" | "ko";
}
```

#### 4\. Language Switcher

```typescript
interface LanguageSwitcherProps {
	currentLanguage: "en" | "ko";
	onLanguageChange: (language: "en" | "ko") => void;
}
```

### State Management Strategy

#### Application State

```typescript
const [nutrients, setNutrients] = useState<NutrientValues>({
	calories: "",
	carbohydrates: "",
	protein: "",
	fat: "",
});

const [result, setResult] = useState<CalculationResult | null>(null);
const [language, setLanguage] = useState<"en" | "ko">("en");
```

#### State Logic

1. **Input Tracking**: Monitor which inputs have values.
2. **Disable Logic**: Automatically disable the 4th input when 3 are filled.
3. **Calculation Trigger**: Calculate when exactly 3 inputs have valid values.
4. **Reset Logic**: Clear all state and re-enable all inputs.

### Validation Rules

#### Input Validation

1. **Numeric Only**: Accept only positive numbers.
2. **Reasonable Limits**:
   - Calories: 1-9999
   - Macros: 0.1-999g
3. **Decimal Precision**: Allow up to 1 decimal place.
4. **Required Fields**: Exactly 3 of 4 inputs must be filled.

#### Calculation Validation

1. **Positive Results**: Prevent negative nutrient calculations.
2. **Nutritional Logic**: Validate that results make nutritional sense.
3. **Tolerance Check**: Allow a 5-calorie difference for rounding discrepancies.
4. **Reasonable Ranges**: Ensure calculated values are within realistic bounds.

#### Error Handling

```typescript
interface ValidationError {
	field: keyof NutrientValues;
	message: string;
	type: "error" | "warning";
}
```

## Implementation Details

### File Structure

All application source code, including components, hooks, libraries, and types, **must be placed inside the root (`./`) directory**. The following structure is only an example, so you are NOT required to follow exact file structure and naming conventions.

```
./
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── nutrient-calculator.tsx
│   ├── nutrient-input.tsx
│   ├── result-display.tsx
│   ├── language-switcher.tsx
│   └── reset-button.tsx
├── lib/
│   ├── utils.ts
│   ├── calculations.ts
│   ├── validation.ts
│   └── translations.ts
├── types/
│   └── index.ts
└── hooks/
    ├── use-nutrient-calculator.ts
    └── use-language.ts
```

### Path Alias Strategy

To ensure clean and maintainable import paths, the project **must use path aliases**. Since the project does not use a `src` directory, the alias will be configured to the project root.

- **Configuration**: The `tsconfig.json` will map `@/*` to `./*`.
- **Usage**: All internal imports must use this alias, avoiding relative paths like `../`.
  - **Correct ✅**: `import { cn } from '@/lib/utils';`
  - **Correct ✅**: `import { NutrientInput } from '@/components/nutrient-input';`
  - **Incorrect ❌**: `import { cn } from '../lib/utils';`

### Key Functions

#### 1\. Core Calculation

```typescript
// Located in @/lib/calculations.ts
import {
	getFilledInputs,
	getEmptyField,
	roundToDecimal,
	validateResult,
} from "@/lib/utils";
import { NutrientValues, CalculationResult } from "@/types";

function calculateMissingNutrient(values: NutrientValues): CalculationResult {
	const filledInputs = getFilledInputs(values);

	if (filledInputs.length !== 3) {
		return {
			value: 0,
			field: "calories",
			isValid: false,
			error: "Need exactly 3 inputs",
		};
	}

	const emptyField = getEmptyField(values);
	const result = performCalculation(values, emptyField);

	return {
		value: roundToDecimal(result, 1),
		field: emptyField,
		isValid: validateResult(result),
		error: validateResult(result) ? undefined : "Invalid calculation",
	};
}
```

#### 2\. Input Management

```typescript
// Located in @/lib/utils.ts
import { NutrientValues } from "@/types";

function getFilledInputs(values: NutrientValues): (keyof NutrientValues)[] {
	return (Object.keys(values) as (keyof NutrientValues)[]).filter(
		(key) => values[key].trim() !== ""
	);
}

function shouldDisableInput(
	values: NutrientValues,
	inputName: keyof NutrientValues
): boolean {
	const filledInputs = getFilledInputs(values);
	return filledInputs.length === 3 && !values[inputName];
}
```

#### 3\. Enhanced Validation

```typescript
// Located in @/lib/validation.ts
function validateNutrientInput(
	value: string,
	type: "calories" | "macro"
): boolean {
	const num = parseFloat(value);
	if (isNaN(num) || num < 0) return false; // Allow 0 for macros

	if (type === "calories") return num >= 1 && num <= 9999;
	if (type === "macro") return num >= 0 && num <= 999;

	return true;
}

function validateNutritionalLogic(
	calories: number,
	carbs: number,
	protein: number,
	fat: number
): boolean {
	const calculatedCalories = carbs * 4 + protein * 4 + fat * 9;
	return Math.abs(calories - calculatedCalories) <= 5; // Tolerance of 5 calories
}
```

### Language Support

#### Translation System

```typescript
// Located in @/lib/translations.ts
export const translations = {
	en: {
		/* ... */
	},
	ko: {
		/* ... */
	},
};
```

#### Language Detection

```typescript
// Located in @/hooks/use-language.ts
function detectBrowserLanguage(): "en" | "ko" {
	if (typeof window !== "undefined") {
		return window.navigator.language.startsWith("ko") ? "ko" : "en";
	}
	return "en"; // Default server-side language
}
```

## User Interface Specifications

### Layout Design

- **Container**: Centered layout with a maximum width.
- **Header**: Title and subtitle.
- **Input Grid**: 2x2 grid of input fields on larger screens.
- **Result Area**: Prominent display below the inputs.
- **Actions**: Reset button and language switcher.

### Responsive Design

- **Mobile**: Single-column layout for inputs.
- **Tablet**: 2-column input layout.
- **Desktop**: Optimized spacing and typography for a 2x2 grid.

### Accessibility

- **ARIA Labels**: Proper labeling for all inputs and controls for screen readers.
- **Keyboard Navigation**: Full keyboard support for all interactive elements.
- **Focus Management**: Clear and visible focus indicators.
- **Color Contrast**: Adherence to WCAG AA contrast ratios.
- **Error Announcements**: Use of ARIA live regions to announce errors to screen readers.

## Performance Requirements

### Performance Targets

- **First Contentful Paint (FCP)**: \< 1.5s
- **Time to Interactive (TTI)**: \< 2.0s
- **Lighthouse Score**: \> 95 for Performance, Accessibility, Best Practices, SEO.
- **Bundle Size**: Keep initial JS bundle under 100KB gzipped.

### Optimization Strategies

- **Code Splitting**: Dynamically import non-critical components or libraries.
- **Memoization**: Use `React.memo` for components and `useMemo` for expensive calculations.
- **Lazy Loading**: Lazy load translations or other non-essential assets.
- **Image Optimization**: Utilize the Next.js `<Image>` component if images are added.

## Deployment Specifications

### Vercel Configuration

```json
{
	"buildCommand": "bun run build",
	"installCommand": "bun install",
	"framework": "nextjs"
}
```

### Environment Variables

```bash
NEXT_PUBLIC_APP_URL="https://your-app-url.vercel.app"
NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"
```

### Build Optimization

- **Static Site Generation (SSG)**: Pre-render the main page at build time for maximum speed.
- **Asset Optimization**: Leverage Next.js's automatic CSS/JS minification and asset optimization.
- **Bundle Analysis**: Use `@next/bundle-analyzer` to monitor dependency sizes.

## Success Metrics

### Functional Requirements

- ✅ Calculate missing nutrients accurately using the 4/4/9 calorie conversion.
- ✅ Support both English and Korean languages seamlessly.
- ✅ A fully responsive design works flawlessly on mobile, tablet, and desktop.
- ✅ Auto-disable the correct input field when three inputs are filled.

### Technical Requirements

- ✅ All imports use `@/` path aliasing.
- ✅ The entire codebase uses TypeScript with strict type safety.
- ✅ Accessibility meets WCAG 2.1 AA standards.

### User Experience Requirements

- ✅ The workflow is intuitive and requires no instructions.
- ✅ All user actions provide clear and immediate visual feedback.
- ✅ Error handling is user-friendly, with helpful messages.
