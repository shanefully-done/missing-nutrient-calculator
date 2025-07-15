# miscalc

A modern web application for calculating missing macronutrient values using Next.js 15 and shadcn/ui components. miscalc helps users determine the missing nutrient (calories, carbohydrates, protein, or fat) when three of the four values are provided.

## Features

- **Smart Calculation**: Automatically calculates the missing macronutrient using standard nutritional conversion rates
- **Interactive UI**: Auto-disables the 4th input when 3 values are provided
- **Bilingual Support**: Full English and Korean language support
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Results**: Instant calculation and display of missing nutrients
- **Reset Functionality**: One-click reset to start fresh calculations

## How It Works

miscalc uses standard nutritional science to calculate missing values:

- **Carbohydrates**: 4 calories per gram
- **Protein**: 4 calories per gram
- **Fat**: 9 calories per gram
- **Total Calories** = (Carbs × 4) + (Protein × 4) + (Fat × 9)

### Calculation Examples

- **Missing Calories**: `(carbs × 4) + (protein × 4) + (fat × 9)`
- **Missing Carbs**: `(calories - (protein × 4) - (fat × 9)) / 4`
- **Missing Protein**: `(calories - (carbs × 4) - (fat × 9)) / 4`
- **Missing Fat**: `(calories - (carbs × 4) - (protein × 4)) / 9`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js 18+ (for compatibility)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd miscalc

# Install dependencies
bun install

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Build the application
bun run build

# Start the production server
bun start
```

## Usage

1. **Enter Values**: Fill in any 3 of the 4 nutrient fields (calories, carbs, protein, fat)
2. **View Result**: The missing nutrient will be calculated and displayed automatically
3. **Reset**: Click the reset button to clear all values and start over
4. **Language**: Switch between English and Korean using the language toggle

## Development

### Project Structure

```
miscalc/
├── app/                    # Next.js app directory
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

### Key Components

- **NutrientCalculator**: Main calculator component
- **NutrientInput**: Individual input fields with validation
- **LanguageSwitcher**: Bilingual support toggle
- **ResetButton**: Clear all inputs functionality

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking

## Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.0s
- **Lighthouse Score**: > 95 across all metrics
- **Bundle Size**: < 100KB gzipped

## Accessibility

- WCAG 2.1 AA compliant
- Full keyboard navigation support
- Screen reader compatible
- High contrast ratios
- Focus management

## License

MIT License - see LICENSE file for details
