<script lang="ts">
	import type { TextChipProps } from "./TextChipProps";

	let { children, queryClass = "" }: TextChipProps = $props();
</script>

<span class={`chip text-chip font-bold pointer-events-none ${queryClass}`}>{@render children()}</span>

<style>
    /*noinspection CssUnusedSymbol*/
    :global(.highlight-chip.text-chip) {
        background-color: var(--color-secondary-500) /* oklch(55.6% 0 0deg) = #737373 */;
        color: var(--color-secondary-contrast-500) /* var(--color-secondary-contrast-light) */;
    }
</style>