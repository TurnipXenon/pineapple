<script lang="ts">
	import type { TextChipProps } from '$lib/upstream-ui/elements/text-chip/TextChipProps';

	let { children, queryClass = '' }: TextChipProps = $props();
</script>

<span class={`chip text-chip font-bold pointer-events-none ${queryClass}`}>{@render children()}</span>
