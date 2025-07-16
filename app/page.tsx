import { NutrientCalculator } from "@/components/nutrient-calculator";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ExternalLinks } from "@/components/external-links";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen bg-background flex flex-col items-center p-4">
			<div className="w-full max-w-2xl space-y-4">
				<Card>
					<CardContent className="pt-6">
						<NutrientCalculator />
					</CardContent>
				</Card>
				<div className="flex justify-between items-center w-full">
					<div className="flex gap-4">
						<ExternalLinks />
						{/* You can add more left-side items here */}
					</div>
					<LanguageSwitcher />
				</div>
			</div>
		</main>
	);
}
