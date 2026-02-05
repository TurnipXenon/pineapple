import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

export type TextLinkProps = {
	/** Link destination. */
	href: string;
	/** Link label content. */
	children: Snippet;
} & HTMLAnchorAttributes;
