# miscalc - Technical Documentation

## Development Environment and Stack

The `miscalc` application is built using a modern web development stack designed for performance, scalability, and developer experience.

### Tech Stack

- **Framework**: Next.js 15 (App Router) - Chosen for its server-side rendering capabilities, file-system based routing, and optimized build processes.
- **Runtime**: Bun - Utilized for its fast JavaScript runtime, package manager, and bundler, contributing to quicker development cycles and efficient builds.
- **UI Library**: shadcn/ui components - Provides a collection of accessible and customizable UI components built on top of Radix UI and Tailwind CSS, ensuring a consistent and high-quality user interface.
- **Styling**: Tailwind CSS - A utility-first CSS framework that enables rapid UI development and highly customizable designs.
- **Language**: TypeScript - Ensures type safety throughout the codebase, reducing runtime errors and improving code maintainability and readability.
- **Deployment**: Vercel - The preferred platform for deploying Next.js applications, offering seamless integration, automatic deployments, and global CDN.

### Key Technical Decisions

- **App Router**: Leveraging Next.js 15's App Router for modern routing and data fetching paradigms.
- **Path Aliasing**: All internal imports use `@/` path aliasing, configured in `tsconfig.json` to map `@/*` to `./*`. This promotes cleaner and more maintainable import paths, avoiding relative path hell.
  - **Configuration**: `tsconfig.json` will include `"paths": { "@/": ["./*"] }`.
  - **Usage**: `import { cn } from '@/lib/utils';`
- **Component-Based Architecture**: The application is designed with a clear component hierarchy, promoting reusability and modularity.
- **Unidirectional Data Flow**: State management is centralized, primarily within the `useNutrientCalculator` hook, ensuring predictable state changes.

## Implementation Details

### File Structure

The application source code is organized within the root (`./`) directory, following a logical separation of concerns:

```
./
├── app/                  # Next.js App Router pages and layout
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main application page
├── components/           # Reusable React components
│   ├── ui/               # shadcn/ui components (auto-generated/managed)
│   ├── nutrient-calculator.tsx # Main calculator component
│   ├── nutrient-input.tsx      # Individual nutrient input field
│   ├── result-display.tsx      # Displays calculation results
│   ├── language-switcher.tsx   # Component for language selection
│   └── reset-button.tsx        # Button to reset inputs
├── lib/                  # Utility functions and business logic
│   ├── utils.ts          # General utility functions (e.g., `cn` helper)
│   ├── calculations.ts   # Core nutrient calculation logic
│   ├── validation.ts     # Input and calculation validation rules
│   └── translations.ts   # Translation data for i18n
├── types/                # TypeScript type definitions and interfaces
│   └── index.ts          # Centralized type declarations
└── hooks/                # Custom React hooks for reusable logic
    ├── use-nutrient-calculator.ts # Hook for calculator state and logic
    └── use-language.ts            # Hook for language detection and management
```

### Key Functions

- **Core Calculation (`lib/calculations.ts`)**:
  - `calculateMissingNutrient(values: NutrientValues): CalculationResult`: The central function responsible for determining the missing nutrient value based on the provided inputs and nutritional conversion rates. It leverages helper functions for input parsing, rounding, and result validation.
- **Input Management (`lib/utils.ts`)**:
  - `getFilledInputs(values: NutrientValues): (keyof NutrientValues)[]`: Identifies which nutrient input fields currently contain values.
  - `shouldDisableInput(values: NutrientValues, inputName: keyof NutrientValues): boolean`: Determines if a specific input field should be disabled based on the number of filled inputs.
- **Enhanced Validation (`lib/validation.ts`)**:
  - `validateNutrientInput(value: string, type: "calories" | "macro"): boolean`: Validates individual nutrient input values against numeric constraints, reasonable limits (e.g., 1-9999 for calories, 0.1-999g for macros), and decimal precision.
  - `validateNutritionalLogic(calories: number, carbs: number, protein: number, fat: number): boolean`: Performs a tolerance check (e.g., 5-calorie difference) to ensure calculated values make nutritional sense.

### State Management Strategy

- **Application State**: Managed using React's `useState` hook, primarily within the `useNutrientCalculator` custom hook. Key state variables include:
  - `nutrients`: Stores the current values for calories, carbohydrates, protein, and fat.
  - `result`: Holds the `CalculationResult` object, including the calculated value, the field it belongs to, validity status, and any error messages.
  - `language`: Tracks the currently selected language (`"en"` or `"ko"`).
- **State Logic**:
  - **Input Tracking**: Monitors which input fields have been populated.
  - **Disable Logic**: Automatically disables the fourth input field once three fields are filled.
  - **Calculation Trigger**: Initiates calculation only when exactly three valid inputs are present.
  - **Reset Logic**: Clears all input values and resets the calculation result, re-enabling all input fields.

### Validation Rules

- **Input Validation**:
  - **Numeric Only**: Only positive numbers are accepted.
  - **Reasonable Limits**: Calories (1-9999), Macros (0.1-999g).
  - **Decimal Precision**: Allows up to one decimal place.
  - **Required Fields**: Exactly three of the four inputs must be filled for a calculation to proceed.
- **Calculation Validation**:
  - **Positive Results**: Ensures calculated nutrient values are not negative.
  - **Nutritional Logic**: Verifies that the calculated result aligns with nutritional principles (e.g., total calories from macros should be close to the calculated calorie value, with a tolerance for rounding).
  - **Reasonable Ranges**: Calculated values are checked against realistic nutritional bounds.

### Error Handling

Errors are communicated to the user through a `ValidationError` interface, providing `field`, `message`, and `type` (`"error"` or `"warning"`) to guide visual feedback.

### Language Support

- **Translation System**: Translations are managed in `lib/translations.ts`, providing English (`en`) and Korean (`ko`) language support.
- **Language Detection**: The `use-language.ts` hook detects the browser's preferred language to set the initial application language.
