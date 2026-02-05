export interface CodeBlockProps {
	/** Code string to render inside the block. */
	code?: string;
	/** Highlighting language key. */
	lang?: 'console' | 'html' | 'css' | 'js' | 'ts' | 'markdown' | 'xml' | 'svelte';
	// Base Style Props
	/** Base wrapper classes. */
	base?: string;
	/** Wrapper rounding classes. */
	rounded?: string;
	/** Wrapper shadow classes. */
	shadow?: string;
	/** Additional wrapper classes. */
	classes?: string;
	// Pre Style Props
	/** Base classes applied to the nested pre element. */
	preBase?: string;
	/** Padding classes applied to the nested pre element. */
	prePadding?: string;
	/** Additional classes applied to the nested pre element. */
	preClasses?: string;
}
