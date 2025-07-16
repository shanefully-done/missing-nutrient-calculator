"use client";

import { useLanguage } from "@/hooks/use-language";

export function ExternalLinks() {
	const { t } = useLanguage();

	return (
		<>
			<a
				href="https://github.com/shanefully-done/miscalc"
				target="_blank"
				rel="noopener noreferrer"
				className="text-muted-foreground hover:text-primary transition-colors"
			>
				{t.github}
			</a>
			<a
				href="https://shanefully-done.github.io"
				target="_blank"
				rel="noopener noreferrer"
				className="text-muted-foreground hover:text-primary transition-colors"
			>
				{t.blog}
			</a>
		</>
	);
}
