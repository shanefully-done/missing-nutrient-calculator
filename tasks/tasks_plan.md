# miscalc - Detailed Task Backlog

This document outlines the detailed task backlog for the `miscalc` project, tracking its progress, what has been built, what remains, and any known issues.

## Project Goals

The primary goal of `miscalc` is to provide a modern, intuitive web application for calculating missing macronutrient values, ensuring accuracy, responsiveness, and a positive user experience.

## Current Status

- Documentation foundation established.
- Core architectural and technical specifications defined.

## What's Left to Build

### 1. Core Functionality Implementation

- **Implement `calculateMissingNutrient` function**:
  - Develop the logic in `lib/calculations.ts` to accurately calculate the missing nutrient based on the 4/4/9 calorie conversion rates.
  - Ensure results are rounded to 1 decimal place.
- **Develop Input Management Logic**:
  - Implement `getFilledInputs` and `shouldDisableInput` in `lib/utils.ts`.
  - Integrate auto-disable logic for the 4th input when 3 are filled.
- **Create Enhanced Validation**:
  - Implement `validateNutrientInput` in `lib/validation.ts` for numeric-only input, reasonable limits (calories 1-9999, macros 0.1-999g), and decimal precision.
  - Implement `validateNutritionalLogic` to ensure calculated values are nutritionally sound with a 5-calorie tolerance.
- **Integrate State Management**:
  - Develop the `useNutrientCalculator` hook to manage `nutrients`, `result`, and `language` states.
  - Implement input tracking, calculation triggering, and reset logic within the hook.

### 2. User Interface Development

- **Build `NutrientCalculator` Component**:
  - Create the main component (`components/nutrient-calculator.tsx`) to house the input fields, result display, and action buttons.
  - Integrate `useNutrientCalculator` hook for state management.
- **Design `NutrientInput` Component**:
  - Develop a reusable input component (`components/nutrient-input.tsx`) with `label`, `value`, `onChange`, `disabled`, `error`, and `placeholder` props.
  - Apply appropriate shadcn/ui styling and visual states (empty, filled, disabled, error).
- **Create `ResultDisplay` Component**:
  - Implement a component (`components/result-display.tsx`) to prominently display the calculated result and handle error messages.
- **Develop `LanguageSwitcher` Component**:
  - Create a component (`components/language-switcher.tsx`) to allow users to switch between English and Korean.
  - Integrate with the language state and translation system.
- **Implement Reset Functionality**:
  - Add a "Reset" button (`components/reset-button.tsx`) that clears all inputs and re-enables fields.
- **Apply Visual States**:
  - Ensure all visual states (empty, filled, disabled, result display, error, success) are correctly implemented using Tailwind CSS and shadcn/ui.

### 3. Language Support

- **Populate `translations.ts`**:
  - Add all necessary English and Korean translation strings to `lib/translations.ts`.
- **Implement `use-language.ts` Hook**:
  - Develop the hook to detect browser language and manage the `language` state.

### 4. User Experience & Accessibility

- **Responsive Design**:
  - Implement responsive layouts for mobile (single-column), tablet (2-column), and desktop (2x2 grid) using Tailwind CSS.
- **Accessibility Features**:
  - Add ARIA labels for all inputs and controls.
  - Ensure full keyboard navigation support.
  - Implement clear focus indicators.
  - Verify WCAG AA contrast ratios.
  - Utilize ARIA live regions for error announcements.

### 5. Deployment & Optimization

- **Vercel Configuration**:
  - Verify `next.config.ts` and `vercel.json` (if applicable) are correctly configured for Vercel deployment.
  - Ensure `bun run build` and `bun install` commands are used.
- **Performance Optimization**:
  - Consider code splitting, memoization (`React.memo`, `useMemo`), and lazy loading for non-critical assets.
  - Monitor bundle size using `@next/bundle-analyzer`.
- **Environment Variables**:
  - Set up `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_ANALYTICS_ID` (if analytics are implemented).

## Known Issues

- None at this initial stage.
