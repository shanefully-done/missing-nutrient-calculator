# miscalc - System Architecture

## Project Overview

The `miscalc` application is a modern web application built with Next.js 15 and shadcn/ui, designed to calculate missing macronutrient values. It helps users determine an unknown nutrient (calories, carbohydrates, protein, or fat) when three of the four values are provided, based on standard nutritional conversion rates.

## Core Components

The application is structured around several key React components and utility modules:

- **`NutrientCalculator` Component**: The main container component that orchestrates the input, calculation, and display logic. It manages the overall application state.
- **`NutrientInput` Component**: Reusable input fields for calories, carbohydrates, protein, and fat. Each input handles its own value and state, communicating changes up to the `NutrientCalculator`.
- **`ResultDisplay` Component**: Displays the calculated missing nutrient value and any associated validation errors.
- **`LanguageSwitcher` Component**: Allows users to toggle between English and Korean languages for the UI.
- **`useNutrientCalculator` Hook**: A custom React hook responsible for encapsulating the core state management, input tracking, calculation triggering, and reset logic.
- **`lib/calculations.ts`**: Contains the core business logic for calculating the missing macronutrient based on the provided three values.
- **`lib/validation.ts`**: Handles input validation (numeric only, reasonable limits, decimal precision) and calculation validation (positive results, nutritional logic, tolerance checks).
- **`lib/utils.ts`**: Provides utility functions such as `getFilledInputs` and `shouldDisableInput` for managing input states.
- **`lib/translations.ts`**: Stores the translation strings for different languages.
- **`hooks/use-language.ts`**: A custom hook for language detection and management.
- **`types/index.ts`**: Defines TypeScript interfaces and types used across the application, ensuring type safety.
- **`components/ui/`**: Directory for shadcn/ui components, providing a consistent and accessible UI foundation.

## Data Flow

The application follows a unidirectional data flow, primarily managed by the `useNutrientCalculator` hook within the `NutrientCalculator` component.

1. **User Input**: Users enter values into `NutrientInput` components.
2. **State Update**: Changes in `NutrientInput` trigger `onChange` events, which update the application state managed by `useNutrientCalculator`.
3. **Calculation Trigger**: When exactly three inputs are filled, `useNutrientCalculator` triggers the `calculateMissingNutrient` function from `lib/calculations.ts`.
4. **Validation**: Input and calculation results are validated using functions from `lib/validation.ts`.
5. **Result Display**: The calculated result and any validation errors are passed to the `ResultDisplay` component for rendering.
6. **UI Updates**: The `NutrientCalculator` component re-renders based on state changes, updating the disabled status of inputs and the displayed result.
7. **Language Change**: The `LanguageSwitcher` updates the language state, which in turn affects the translations displayed via `lib/translations.ts`.

## System Component Diagram

```mermaid
graph TD
    User --> NutrientCalculator[NutrientCalculator Component]
    NutrientCalculator --> NutrientInput[NutrientInput Component]
    NutrientCalculator --> ResultDisplay[ResultDisplay Component]
    NutrientCalculator --> LanguageSwitcher[LanguageSwitcher Component]

    NutrientInput --onChange--> StateManagement[State Management (useNutrientCalculator Hook)]
    StateManagement --updates--> NutrientCalculator
    StateManagement --updates--> ResultDisplay

    StateManagement --uses--> Calculations[lib/calculations.ts]
    StateManagement --uses--> Validation[lib/validation.ts]
    StateManagement --uses--> Utils[lib/utils.ts]
    StateManagement --uses--> Translations[lib/translations.ts]

    Calculations --> Types[types/index.ts]
    Validation --> Types
    Utils --> Types

    LanguageSwitcher --onLanguageChange--> StateManagement
    StateManagement --uses--> LanguageHook[hooks/use-language.ts]

    NutrientCalculator --uses--> ShadcnUI[components/ui/ (shadcn/ui)]
```
