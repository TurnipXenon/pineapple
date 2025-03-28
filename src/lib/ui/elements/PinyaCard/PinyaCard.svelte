<script lang="ts">/**
 * When with texts, wrap the text content inside a div so flex wont apply
 */
import type { PinyaCardProps } from "./PinyaCardProps";

let {
	paddingClass = "pt-[1lh] pb-[1lh] pl-16 pr-16",
	flexClass = "flex flex-col",
	widthClass = "w-full max-w-md",
	borderClass = "border-[2px] border-primary-500 dark:border-0",
	colorClass = "bg-surface-200 dark:bg-surface-900",
	marginClass = "",
	className,
	includeDataNoSnippet = false,
	children
}: PinyaCardProps = $props();

let cardClass = $derived(`card text-start rounded-xl
	${paddingClass} ${flexClass} ${className} ${widthClass} ${borderClass} ${marginClass} ${colorClass}`);
</script>

{#if includeDataNoSnippet}
	<div data-nosnippet class={cardClass}>
		{@render children?.()}
	</div>
{:else }
	<div class={cardClass}>
		{@render children?.()}
	</div>
{/if}
