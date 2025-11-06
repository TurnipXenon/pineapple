import type { WrapperProps } from "$pkg/ui/elements";
import type { HTMLAttributes } from "svelte/elements";

export type PinyaCardProps = HTMLAttributes<HTMLDivElement> & WrapperProps & {
	/** @deprecated */
	paddingClass?: string;
	/** @deprecated */
	className?: string;
	/** @deprecated */
	flexClass?: string;
	/** @deprecated */
	widthClass?: string;
	/** @deprecated */
	borderClass?: string;
	/** @deprecated */
	marginClass?: string;
	/** @deprecated */
	colorClass?: string;
	includeDataNoSnippet?: boolean;
}
