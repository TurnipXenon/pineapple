import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type PinyaAccordionItemProps = {
	/** Control snippet, used as the clickable header content. */
	control: Snippet;
	/** Optional custom indicator snippet for open/close state. */
	controlIndicator?: Snippet;
	/** Panel snippet for expandable content. */
	panel?: Snippet;
	/** Optional explicit value for the item; defaults to a generated id. */
	pinyaValue?: string;
	/** When true, renders a header-only row with no panel. */
	hasNoChild?: boolean;
} & HTMLAttributes<HTMLDivElement>;
