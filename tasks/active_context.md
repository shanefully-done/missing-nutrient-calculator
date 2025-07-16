# Active Context

## Current Work Focus

- Initial setup and configuration of the miscalc application
- Core nutrient calculator functionality is implemented and working
- Language switching functionality is implemented
- Responsive design is implemented with Tailwind CSS
- **GitHub/Blog links implementation completed** - Added inline links with LanguageSwitcher in app/page.tsx

## Active Decisions and Considerations

- Using Next.js 15 with TypeScript for type safety
- Using shadcn/ui components for consistent UI design
- Using Tailwind CSS for styling with custom color scheme
- Supporting both English and Korean languages
- **Inline navigation**: GitHub and Blog links positioned inline with LanguageSwitcher using flex container

## Recent Changes

- **GitHub/Blog links implementation**: Added GitHub and Blog links inline with LanguageSwitcher
- Created new `ExternalLinks` component (`components/external-links.tsx`) as client component for translation support
- Positioned links before LanguageSwitcher in flex container with `gap-4` spacing
- **Updated alignment**: Changed from `justify-end` to `justify-between` to position ExternalLinks left-aligned and LanguageSwitcher right-aligned
- Used existing translation keys (`github`, `blog`) from lib/translations.ts
- Applied consistent styling: `text-muted-foreground hover:text-primary` classes
- Added security attributes: `target="_blank" rel="noopener noreferrer"`
- Links are positioned in the same flex row as LanguageSwitcher with proper spacing

## Next Steps

- Continue testing and refinement of existing functionality
- Monitor for any layout issues with the new inline navigation design
- Consider adding visual feedback for active language selection
