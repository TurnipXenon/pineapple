<script lang="ts">
	import ParsnipBlockChildren from "$pkg/modules/parsnip/ParsnipBlockChildren.svelte";
	import type { List } from "mdast";

	const { list }: { list: List } = $props();
</script>

{#snippet childList(main: List)}
	{#each main.children as child (child)}
		<li>
			<ParsnipBlockChildren blockChildren={child.children} shouldUnwrapParagraph={true} />
		</li>
	{/each}
{/snippet}

{#if list.ordered}
	<ol>
		{@render childList(list)}
	</ol>
{:else }
	<ul>
		{@render childList(list)}
	</ul>
{/if}
