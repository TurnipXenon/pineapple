import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type PinyaAccordionProps = {
	/** Accordion contents, typically PinyaAccordionItem components. */
	children: Snippet;
	/** Controlled set of open item ids. */
	openItems?: string[];
	/** Allow multiple items to be open at once. */
	multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;
